const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Character model
const Character = require("../../models/Character");
// Wallet model
const Wallet = require("../../models/Wallet");
// EquipmentClass model
const EquipmentClass = require("../../models/EquipmentClass");

// Generate equipment
const equipmentGenerator = require("../../utils/equipmentGenerator");

// Sell a random item to player
router.post(
  "/buy-random-equipment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check if logged in
    if (!req.user) {
      return res
        .status(401)
        .json({ notauthorized: "You must log in to purchase equipment" });
    }

    // Search user's wallet and check funds
    Wallet.findOne({ user: req.user }).then(wallet => {
      // If sufficient funds, create a random equipment
      console.log(wallet);
      if (wallet.balance >= 50) {
        wallet.balance -= 50;
        wallet.save();
        Character.findOne({ user: req.user }).then(character => {
          // Create the equipment
          const newEquipmentStats = equipmentGenerator(
            character.stats.lvl,
            "magic"
          );
          const newEquipment = new EquipmentClass({
            owner: req.user,
            preReqs: {
              stats: {
                str: 0,
                dex: 0,
                int: 0
              },
              lvl: 0
            },
            durability: {
              max: newEquipmentStats.durability.max,
              current: newEquipmentStats.durability.current
            },
            damage: newEquipmentStats.damage,
            resistances: {
              fire: newEquipmentStats.resistances.fire,
              ice: newEquipmentStats.resistances.ice,
              lightning: newEquipmentStats.resistances.lightning,
              water: newEquipmentStats.resistances.water,
              earth: newEquipmentStats.resistances.earth,
              wind: newEquipmentStats.resistances.wind,
              light: newEquipmentStats.resistances.light,
              dark: newEquipmentStats.resistances.dark
            },
            name: newEquipmentStats.name,
            type: newEquipmentStats.type,
            subType: newEquipmentStats.subType,
            img: newEquipmentStats.img,
            handling: newEquipmentStats.handling,
            rarity: newEquipmentStats.rarity,
            armorClass: newEquipmentStats.armorClass,
            hp: newEquipmentStats.hp,
            mp: newEquipmentStats.mp,
            bonusDamage: newEquipmentStats.bonusDamage,
            bonusArmorClass: newEquipmentStats.bonusArmorClass,
            str: newEquipmentStats.str,
            dex: newEquipmentStats.dex,
            int: newEquipmentStats.int,
            accuracy: newEquipmentStats.accuracy,
            magicAccuracy: newEquipmentStats.magicAccuracy,
            magicDefense: newEquipmentStats.magicDefense,
            armorPiercing: newEquipmentStats.armorPiercing
          });

          newEquipment.save();
          character.inventory.push(newEquipment);
          character
            .save()
            .then(
              res.status(200).json({ character: character, wallet: wallet })
            );
        });
      } else {
        // If not enough money
        res.status(401).json({
          notenoughfunds: "You need more money to purchase this item"
        });
      }
    });
  }
);

// Sell a specific item to player
router.post(
  "/buy-equipment/:itemType/:itemSubType",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check if logged in
    if (!req.user) {
      return res
        .status(401)
        .json({ notauthorized: "You must log in to purchase equipment" });
    }

    let {itemType} = req.params
    let {itemSubType} = req.params

    // Search user's wallet and check funds
    Wallet.findOne({ user: req.user }).then(wallet => {
      // If sufficient funds, create a random equipment
      
      // Calculate price
      let price
      if(itemType === "hand"){
        if(itemSubType ==="random"){
          price = 50
        }
        if(itemSubType ==="twoHandSword" ||
        itemSubType ==="twoHandClub" ||
        itemSubType ==="twoHandAxe" ||
        itemSubType ==="polearm" ||
        itemSubType ==="bow" ||
        itemSubType ==="crossbow" ||
        itemSubType ==="rifle"){
          price = 200
        }
        if(itemSubType === "oneHandSword" ||
        itemSubType === "oneHandClub" ||
        itemSubType === "oneHandAxe" ||
        itemSubType === "pistol" ){
          price = 100
        }
      }
      if(itemType === "arms" ||
      itemType === "hands" ||
      itemType === "feet"){
        price = 100
      }
      if(itemType === "shoulders" ||
      itemType === "head"){
        price = 150
      }
      if(itemType === "body" ||
      itemType === "legs" ||
      itemType === "ring" ||
      itemType === "neck"){
        price = 200
      }
      if(itemType==="ammunition"){
        price=50;
      }

      if (wallet.balance >= price) {
        Character.findOne({ user: req.user }).then(character => {
          // Check inventory space
          if(character.inventory.length < character.inventorySpace){
          // Charge the wallet
          wallet.balance -= price;
          wallet.save();
          // Create the equipment
          const newEquipmentStats = equipmentGenerator(
            character.lvl,
            "magic",
            itemType,
            itemSubType
          );
          console.log(newEquipmentStats)
          const newEquipment = new EquipmentClass({
            owner: req.user,
            preReqs: {
              stats: {
                str: 0,
                dex: 0,
                int: 0
              },
              lvl: 0
            },
            durability: {
              max: newEquipmentStats.durability.max,
              current: newEquipmentStats.durability.current
            },
            damage: newEquipmentStats.damage,
            resistances: {
              fire: newEquipmentStats.resistances.fire,
              ice: newEquipmentStats.resistances.ice,
              lightning: newEquipmentStats.resistances.lightning,
              water: newEquipmentStats.resistances.water,
              earth: newEquipmentStats.resistances.earth,
              wind: newEquipmentStats.resistances.wind,
              light: newEquipmentStats.resistances.light,
              dark: newEquipmentStats.resistances.dark
            },
            name: newEquipmentStats.name,
            type: newEquipmentStats.type,
            subType: newEquipmentStats.subType,
            img: newEquipmentStats.img,
            handling: newEquipmentStats.handling,
            rarity: newEquipmentStats.rarity,
            armorClass: newEquipmentStats.armorClass,
            hp: newEquipmentStats.hp,
            mp: newEquipmentStats.mp,
            bonusDamage: newEquipmentStats.bonusDamage,
            bonusArmorClass: newEquipmentStats.bonusArmorClass,
            str: newEquipmentStats.str,
            dex: newEquipmentStats.dex,
            int: newEquipmentStats.int,
            accuracy: newEquipmentStats.accuracy,
            magicAccuracy: newEquipmentStats.magicAccuracy,
            magicDefense: newEquipmentStats.magicDefense,
            armorPiercing: newEquipmentStats.armorPiercing
          });

          newEquipment.save();
          character.inventory.push(newEquipment._id);
          character
            .save()
            .then(
              res.status(200).json({ character: character, wallet: wallet })
            );
        } else {
          res.status(403).json({inventory: "Inventory Full"})
        }
      });
        
      } else {
        // If not enough money
        res.status(403).json({
          notenoughfunds: "Insufficient funds"
        });
      }
    });
  }
);

module.exports = router;
