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

// get equipment
router.get("/equipment", (req, res) => {
  Character.findOne({ user: req.characterId })
    .then(character => {
      res.status(200).json(character.equipment);
    })
    .catch(err =>
      res
        .status(404)
        .json({ nosuchcharacter: "There is no character with that ID" })
    );
});

// change equipment
router.put(
  "/equipment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Character.findOne({ user: req.user.id }).then(character => {
      const { itemToBeEquipped, slot } = req.body;
      if (itemToBeEquipped.type === slot) {
        // check to make sure you aren't wearing rings on your feet
        character.equipment.slot = req.body.itemToBeEquipped._id;
        res.status(200).json(character);
      } else {
        res
          .status(400)
          .json({
            wrongslot: "You can not equip this type of item to that slot"
          });
      }
    });
  }
);
