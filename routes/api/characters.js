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
      .populate('inventory')
      .then(character => {
        res.status(200).json(character.inventory)
      })
      .catch(err => res.status(400).json({ err: "error" }));
    }
  )

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
        Character.findOne({ user: req.user.id }).populate('equipment.handRight').then(character => {
          if(equipment.type !== "hand" && equipment.type !== "ring"){ // Take care of all slots excepting hands and rings
          // If slot was occupied, take item out into inventory
          if(character.equipment[equipment.type]) character.inventory.push(character.equipment[equipment.type])
          character.equipment[equipment.type] = equipment;

          // If no ring on 1st finger, put ring, else put on 2nd finger, else replace 1st ring with new ring
          } 
          // Take care of hand held items, Prioritizing empty slots right to left
          else if(equipment.type === "ring" || equipment.type === "hand"){
            // if Hand-type
            if(equipment.type === "hand"){
            // If equipping a 2h item, remove each hand's items if they exist, then equip to right hand
            if(equipment.handling === "2h"){
              if(character.equipment["handRight"]){
                 character.inventory.push(character.equipment["handRight"])
              }
              if(character.equipment["handLeft"]){
                character.inventory.push(character.equipment["handLeft"])
                character.equipment.handLeft = null
              }
              character.equipment["handRight"] = equipment 
            }
            // If right hand is empty, put it there
            else if(!character.equipment["handRight"]){
              character.equipment["handRight"] = equipment
            }
            
            // if already holding 2h, swap right hands
            else if(character.equipment.handRight.handling === "2h"){
              character.inventory.push(character.equipment.handRight)
              character.equipment.handRight = equipment
            }
            // if 1h in right and left empty
            else if(!character.equipment.handLeft){
              character.equipment.handLeft = equipment
            }
            // if both hands holding 1h
            else{
              character.inventory.push(character.equipment.handRight)
              character.equipment.handRight = equipment
            }
          }
            
          // if ring
          else {
            // Check right ring
            if(!character.equipment.ringRight) {
              character.equipment.ringRight = equipment
            } else if(!character.equipment.ringLeft){
              character.equipment.ringLeft = equipment
            } else {
              character.inventory.push(character.equipment["ringRight"])
              character.equipment.ringRight = equipment
            }
          } 
        }
          // Remove item from inventory array
          character.inventory.splice(character.inventory.indexOf(equipment.id),1)
          console.log("item equipped");
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

router.put("/unequip/:slot", passport.authenticate('jwt', {session: false}), (req, res) => {
    if (!req.user) {
      res.status(401).json({ notloggedin: "You must log in to equip items" });
    }
    Character.findOne({user: req.user.id}).then(character => {
      console.log(character.inventory.length)
      if(character.inventory.length < character.inventorySpace){
      character.inventory.push(character.equipment[req.params.slot])
      character.equipment[req.params.slot] = null;
      character.save()
      res.status(200).json(character)
      }
      else{
        res.status(200).json({inventoryfull: "Make room in your inventory first"})
      }
    })
})

router.delete("/destroy-item/:itemId", passport.authenticate('jwt', {session: false}), (req, res) => {
  EquipmentClass.findById(req.params.itemId).then(item => {
    console.log(item.owner)
    console.log(req.user.id)
    if(req.user.id == item.owner){
      console.log("item destroyed")
      item.remove().then(Character.findOne({user: req.user.id})
        .then(character => {
          res.status(200).json(character.inventory)
        }))
    }
    else {
      res.status(200).json({notauthorized: "You may only destroy items you own"})
    }
  })
})

router.put("/update-stats/", (req, res) => {
  character.findOne({user: req.user.id}).then(character => {
    let baseStats = {
      lvl: 0,
      exp: {
        current: 0,
        nextLevel: 0
      },
      hp: {
        max: 0,
        current: 0
      },
      mp: {
        max: 0,
        current: 0
      },
      str: 0,
      dex: 0,
      int: 0,
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
    }
    for(let item in character.equipment){

    }
  })
})

module.exports = router;
