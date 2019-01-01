const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Equipment model
const EquipmentClass = require("../../models/EquipmentClass");

// create item of equipment
router.post("/create", (req, res) => {
  const newEquipmentStats = equipmentGenerator(8, "magic");
  const newEquipment = new EquipmentClass({
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
    damage: {
      min: newEquipmentStats.damage.min,
      max: newEquipmentStats.damage.max
    },
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

  newEquipment
    .save()
    .then(res.status(200).json({ newEquipment: newEquipment }))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
