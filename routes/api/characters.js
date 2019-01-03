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
      console.log(equipment);
    });
  }
);

module.exports = router;
