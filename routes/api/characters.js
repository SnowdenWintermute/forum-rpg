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
            res.status(200).json(inventory);
          })
          .catch(err => res.status(400).json({ err: "error" }));
      })
      .catch(err => res.status(400).json({ err: "error" }));
  }
);

// get equipment

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
          if(equipment.type !== "hand" && equipment.type !== "ring" && equipment.type !== "ammunition"){
          character.equipment[equipment.type] = equipment;

          // If no ring on 1st finger, put ring, else put on 2nd finger, else replace 1st ring with new ring
          } else if(equipment.type === "ring" || equipment.type === "hand"){
            if(!character.equipment[equipment.type+"Right"]){
              character.equipment[equipment.type+"Right"] = equipment
            }
            else if(!character.equipment[equipment.type+"Left"]) {
              character.equipment[equipment.type+"Left"] = equipment
            }
            else {
              character.inventory.push(character.equipment[equipment.type+"Right"])
              character.equipment[equipment.type+"Right"] = equipment
            }
          } else { // Put ammunition into left or right hand
            if(!character.equipment["handRight"]){
              character.equipment["handRight"] = equipment
            }
            else if(!character.equipment["handLeft"]) {
              character.equipment["handLeft"] = equipment
            }
            else {
              character.inventory.push(character.equipment["handRight"])
              character.equipment["handRight"] = equipment
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
