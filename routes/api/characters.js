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
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) =>{
  if(!req.user){
    res.status(401).json({notauthorized: "You must log in to view your character sheet"})
  }

  Character.findOne({user: req.user.id})
    .then(character => res.status(200)
    .json(character))
    .catch(err => res.status(400).json(err))

})


// Show owned items
router.get(
  "/inventory",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      res
        .status(401)
        .json({ notauthorized: "You must log in to view your inventory" });
    }

    let promises = [];
    let inventory = [];
    Character.findOne({ user: req.user.id })
      .then(character => {
        character.inventory.forEach(item => {
          promises.push(
            EquipmentClass.findById(item._id).then(item => {
              inventory.push(item);
            })
          );
        });
        Promise.all(promises)
          .then(() => {
            inventory.sort()
            res.status(200).json(inventory);
          })
          .catch(err => res.status(400).json({ err: "error" }));
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

    let promises = [];
    let equipment = {};
    Character.findOne({ user: req.user.id })
      .populate('equipment.shoulders')
      .populate('equipment.head')
      .populate('equipment.neck')
      .populate('equipment.arms')
      .populate('equipment.body')
      .populate('equipment.hands')
      .populate('equipment.ringRight')
      .populate('equipment.legs')
      .populate('equipment.ringLeft')
      .populate('equipment.handRight')
      .populate('equipment.feet')
      .populate('equipment.handLeft')
      .populate('equipment.ammunition')
      .then(character => {
        res.status(200).json(character.equipment)

      })
      .catch(err => res.status(400).json({ err: "error" }));
    }
  )
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
        Character.findOne({ user: req.user.id }).then(character => {

          console.log(equipment.type);
          if(equipment.type !== "hand" && equipment.type !== "ring"){ // Take care of all slots excepting hands and rings
          // If slot was occupied, take item out into inventory
          if(character.equipment[equipment.type]) character.inventory.push(character.equipment[equipment.type])
          character.equipment[equipment.type] = equipment;

          // If no ring on 1st finger, put ring, else put on 2nd finger, else replace 1st ring with new ring
          // Take care of hand held items, Prioritizing empty slots right to left
          } else if(equipment.type === "ring" || equipment.type === "hand"){
            // If equipping a 2h item, remove each hand's items if they exist, then equip to right hand
            if(equipment.handling === "2h"){
              if(character.equipment["handRight"]) character.inventory.push(character.equipment["handRight"])
              if(character.equipment["handLeft"]) character.inventory.push(character.equipment["handLeft"])
              character.equipment["handRight"] = equipment
            // If right hand/ring is empty, put it there
            }else if(!character.equipment[equipment.type+"Right"]){
              character.equipment[equipment.type+"Right"] = equipment
            }
            // Else if left hand/ring is empty, put it there
            else if(!character.equipment[equipment.type+"Left"]) {
              if(equipment.type === "hand"){
                // If attempt to equip 1h weapon to left hand while wielding a 2h
                if (character.equipment["handRight"].handling === "2h"){
                  // Remove the 2h item from right hand and put the 1h item there
                  character.inventory.push(character.equipment["handRight"])
                  character.equipment["handRight"] = equipment
                }
              } else { // else put it in left hand
              character.equipment[equipment.type+"Left"] = equipment
              }
            }
            // Else if both hands full, replace right hand
            else {
              character.inventory.push(character.equipment[equipment.type+"Right"])
              character.equipment[equipment.type+"Right"] = equipment
            }
          }
          // Remove item from inventory array
          character.inventory.splice(character.inventory.indexOf(equipment.id),1)
          console.log(character);
          character.save().then(res.status(200).json(character))
        });
      } else {
        res
          .status(401)
          .json({ notyouritem: "You may only equip an item that you own" });
      }
    });
  }
);

module.exports = router;
