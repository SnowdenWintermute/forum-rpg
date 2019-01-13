const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Wallet model
const Character = require("../../models/Character");
const EquipmentClass = require("../../models/EquipmentClass");

// add xp and level up if should

// add item to inventory

// equip and unequip item

// damage or heal hp

// plus or minus mp

// add stats

// Get full character
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      res.status(401).json({
        notauthorized: "You must log in to view your character sheet"
      });
    }

    Character.findOne({ user: req.user.id })
      .then(character => res.status(200).json(character))
      .catch(err => res.status(400).json(err));
  }
);

// Show inventory items
router.get(
  "/inventory",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      res
        .status(401)
        .json({ notauthorized: "You must log in to view your inventory" });
    }

    Character.findOne({ user: req.user.id })
      .populate("inventory")
      .then(character => {
        res.status(200).json(character.inventory);
      })
      .catch(err => res.status(400).json({ err: "error" }));
  }
);

// Show equiped items
router.get(
  "/equipment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      res
        .status(401)
        .json({ notauthorized: "You must log in to view your equipment" });
    }

    Character.findOne({ user: req.user.id })
      .populate("equipment.shoulders")
      .populate("equipment.head")
      .populate("equipment.neck")
      .populate("equipment.arms")
      .populate("equipment.body")
      .populate("equipment.hands")
      .populate("equipment.ringRight")
      .populate("equipment.legs")
      .populate("equipment.ringLeft")
      .populate("equipment.handRight")
      .populate("equipment.feet")
      .populate("equipment.handLeft")
      .populate("equipment.ammunition")
      .then(character => {
        res.status(200).json(character.equipment);
      })
      .catch(err => res.status(400).json({ err: "error" }));
  }
);

// change equipment
router.put(
  "/equip-item/:itemId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      res.status(401).json({ notloggedin: "You must log in to equip items" });
    }
    EquipmentClass.findById(req.params.itemId).then(equipment => {
      // Check ownership of item matches current user
      if (equipment.owner.toString() === req.user.id.toString()) {
        console.log("(characters.js line 67) item ownership confirmed");
        Character.findOne({ user: req.user.id })
          .populate("equipment.handRight")
          .then(character => {
            // Take care of all slots excepting hands and rings
            if (equipment.type !== "hand" && equipment.type !== "ring") {
              // If slot was occupied, take item out into inventory
              if (character.equipment[equipment.type]) {
                character.inventory.push(character.equipment[equipment.type]);
              }
              character.equipment[equipment.type] = equipment;

              // If no ring on 1st finger, put ring, else put on 2nd finger, else replace 1st ring with new ring
            }
            // Take care of hand held items, Prioritizing empty slots right to left
            else if (equipment.type === "ring" || equipment.type === "hand") {
              // if Hand-type
              if (equipment.type === "hand") {
                // If equipping a 2h item, remove each hand's items if they exist, then equip to right hand
                if (equipment.handling === "2h") {
                  if (character.equipment.handRight) {
                    character.inventory.push(character.equipment.handRight);
                  }
                  if (character.equipment.handLeft) {
                    character.inventory.push(character.equipment.handLeft);
                    character.equipment.handLeft = null;
                  }
                  character.equipment.handRight = equipment;
                }
                // If right hand is empty, put it there
                else if (!character.equipment.handRight) {
                  character.equipment.handRight = equipment;
                }

                // if already holding 2h, swap right hands
                else if (character.equipment.handRight.handling === "2h") {
                  character.inventory.push(character.equipment.handRight);
                  character.equipment.handRight = equipment;
                }
                // if 1h in right and left empty
                else if (!character.equipment.handLeft) {
                  character.equipment.handLeft = equipment;
                }
                // if both hands holding 1h
                else {
                  character.inventory.push(character.equipment.handRight);
                  character.equipment.handRight = equipment;
                }
              }

              // if ring
              else {
                // Check right ring
                if (!character.equipment.ringRight) {
                  character.equipment.ringRight = equipment;
                } else if (!character.equipment.ringLeft) {
                  character.equipment.ringLeft = equipment;
                } else {
                  character.inventory.push(character.equipment["ringRight"]);
                  character.equipment.ringRight = equipment;
                }
              }
            }
            // Remove item from inventory array
            character.inventory.splice(
              character.inventory.indexOf(equipment.id),
              1
            );
            console.log("item equipped");
            character.save();
            res.status(200).json(character);
          });
      } else {
        res
          .status(401)
          .json({ notyouritem: "You may only equip an item that you own" });
      }
    });
  }
);

// UNEQUIP ITEM
router.put(
  "/unequip/:slot",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      res.status(401).json({ notloggedin: "You must log in to equip items" });
    }
    Character.findOne({ user: req.user.id }).then(character => {
      if (character.inventory.length < character.inventorySpace) {
        character.inventory.push(character.equipment[req.params.slot]);
        character.equipment[req.params.slot] = null;
        character.save();
        res.status(200).json(character);
      } else {
        res
          .status(200)
          .json({ inventoryfull: "Make room in your inventory first" });
      }
    });
  }
);

router.delete(
  "/destroy-item/:itemId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    EquipmentClass.findById(req.params.itemId).then(item => {
      if (req.user.id == item.owner) {
        console.log("item destroyed");
        item.remove().then(
          Character.findOne({ user: req.user.id }).then(character => {
            character.inventory.splice(
              character.inventory.indexOf(item._id),
              1
            );
            character.save();
            res.status(200).json(character.inventory);
          })
        );
      } else {
        res
          .status(403)
          .json({ notauthorized: "You may only destroy items you own" });
      }
    });
  }
);

// UPDATE STATS
router.put(
  "/update-stats/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Character.findOne({ user: req.user.id })
      .populate("equipment.shoulders")
      .populate("equipment.head")
      .populate("equipment.neck")
      .populate("equipment.arms")
      .populate("equipment.body")
      .populate("equipment.hands")
      .populate("equipment.ringRight")
      .populate("equipment.legs")
      .populate("equipment.ringLeft")
      .populate("equipment.handRight")
      .populate("equipment.feet")
      .populate("equipment.handLeft")
      .populate("equipment.ammunition")
      .then(character => {
        let newStats = {
          hp: {
            max: character.lvl * 5 + 5,
            current: character.stats.hp.current
          },
          mp: {
            max: character.lvl * 3 + 3,
            current: character.stats.mp.current
          },
          damage: {
            min: character.lvl,
            max: character.lvl
          },
          str: character.lvl,
          dex: character.lvl,
          int: character.lvl,
          armorClass: 0,
          evasion: 0,
          accuracy: 0,
          magicAccuracy: 0,
          magicDefense: 0,
          armorPiercing: 0,
          resistances: {
            fire: 0,
            ice: 0,
            lightning: 0,
            water: 0,
            earth: 0,
            wind: 0,
            light: 0,
            dark: 0
          }
        };

        for (let item in character.equipment) {
          if (
            character.equipment.hasOwnProperty(item) &&
            character.equipment[item] !== undefined
          ) {
            let currentItem = character.equipment[item];
            if (currentItem) {
              newStats.hp.max += currentItem.hp ? currentItem.hp : 0;
              newStats.mp.max += currentItem.mp ? currentItem.mp : 0;
              //if removing gear takes h or mp lower than current values
              if (newStats.hp.max < character.stats.hp.current)
                newStats.hp.current = newStats.hp.max;
              if (newStats.mp.max < character.stats.mp.current)
                newStats.mp.current = newStats.mp.max;

              //damage
              newStats.damage.min += currentItem.damage
                ? currentItem.damage.min
                  ? currentItem.damage.min
                  : 0
                : 0;
              newStats.damage.max += currentItem.damage
                ? currentItem.damage.max
                  ? currentItem.damage.max
                  : 0
                : 0;
              newStats.damage.min += currentItem.bonusDamage
                ? currentItem.bonusDamage
                : 0;
              newStats.damage.max += currentItem.bonusDamage
                ? currentItem.bonusDamage
                : 0;

              newStats.str += currentItem.str ? currentItem.str : 0;
              newStats.dex += currentItem.dex ? currentItem.dex : 0;
              newStats.int += currentItem.int ? currentItem.int : 0;
              newStats.armorClass += currentItem.armorClass
                ? currentItem.armorClass
                : 0;
              newStats.evasion += currentItem.evasion ? currentItem.evasion : 0;
              newStats.accuracy += currentItem.accuracy
                ? currentItem.accuracy
                : 0;
              newStats.magicAccuracy += currentItem.magicAccuracy
                ? currentItem.magicAccuracy
                : 0;
              newStats.magicDefense += currentItem.magicDefense
                ? currentItem.magicDefense
                : 0;
              newStats.armorPiercing += currentItem.armorPiercing
                ? currentItem.armorPiercing
                : 0;
              if (currentItem.resistances !== undefined) {
                newStats.resistances.fire += currentItem.resistances.fire
                  ? currentItem.resistances.fire
                  : 0;
                newStats.resistances.ice += currentItem.resistances.ice
                  ? currentItem.resistances.ice
                  : 0;
                newStats.resistances.lightning += currentItem.resistances
                  .lightning
                  ? currentItem.resistances.lightning
                  : 0;
                newStats.resistances.water += currentItem.resistances.water
                  ? currentItem.resistances.water
                  : 0;
                newStats.resistances.earth += currentItem.resistances.earth
                  ? currentItem.resistances.earth
                  : 0;
                newStats.resistances.wind += currentItem.resistances.wind
                  ? currentItem.resistances.wind
                  : 0;
                newStats.resistances.light += currentItem.resistances.light
                  ? currentItem.resistances.light
                  : 0;
                newStats.resistances.dark += currentItem.resistances.dark
                  ? currentItem.resistances.dark
                  : 0;
              }
              // console.log(newStats)
            }
          }
        }

        // weapon damage
        for (let item in character.equipment) {
          if (
            character.equipment.hasOwnProperty(item) &&
            character.equipment[item] !== undefined
          ) {
            let currentItem = character.equipment[item];
            if (currentItem) {
              if (
                currentItem.subType === "bow" ||
                currentItem.subType === "crossbow"
              ) {
                newStats.damage.min += Math.floor(character.stats.dex / 2);
                newStats.damage.max += Math.floor(character.stats.dex / 2);
              } else if (
                currentItem.subType === "pistol" ||
                currentItem.subType === "rifle"
              ) {
                newStats.damage.min += character.stats.dex;
                newStats.damage.max += character.stats.dex;
              } else if (
                currentItem.subType === "oneHandSword" ||
                currentItem.subType === "oneHandClub" ||
                currentItem.subType === "oneHandAxe"
              ) {
                newStats.damage.min += Math.floor(character.stats.str / 2);
                newStats.damage.max += Math.floor(character.stats.str / 2);
              } else if (
                currentItem.subType === "twoHandSword" ||
                currentItem.subType === "twoHandClub" ||
                currentItem.subType === "twoHandAxe" ||
                currentItem.subType === "polearm"
              ) {
                newStats.damage.min += character.stats.str;
                newStats.damage.max += character.stats.str;
              }
            }
          }
        }

        character.stats = newStats;
        character.save();
        res.status(200).json(character);
      });
  }
);

module.exports = router;
