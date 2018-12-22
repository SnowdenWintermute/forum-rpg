generateDamage = require("./equipmentGenerationUtils/generateDamage");
generateType = require("./equipmentGenerationUtils/generateType");
generateSubType = require("./equipmentGenerationUtils/generateSubType");
generateDurability = require("./equipmentGenerationUtils/generateDurability");
generateArmorClass = require("./equipmentGenerationUtils/generateArmorClass");

module.exports = function equipmentGenerator(level, rarity) {
  // Generate Name

  const type = generateType();
  const subType = generateSubType(type);
  const handling =
    type === "hand"
      ? subType === "1hSword" || "1hClub" || "1hAxe" || "pistol" || "shield"
        ? "1h"
        : "2h"
      : "wearable";
  const damage = generateDamage(subType, level);
  const durability = generateDurability(level, type);
  const armorClass = generateArmorClass(level, type);

  const newEquipment = {
    name: "", // todo
    Type: type,
    subType: subType,
    handling: handling,
    rarity: rarity,
    preReqs: {}, // todo
    durability: durability,
    damage: damage,
    armorClass: armorClass,
    hp: 0,
    mp: 0,
    bonusDamage: 0,
    bonusArmorClass: 0,
    str: req.body.type ? req.body.type : 0,
    dex: req.body.type ? req.body.type : 0,
    int: req.body.type ? req.body.type : 0,
    accuracy: req.body.type ? req.body.type : 0,
    magicAccuracy: req.body.type ? req.body.type : 0,
    magicDefense: req.body.type ? req.body.type : 0,
    armorPiercing: req.body.type ? req.body.type : 0,
    resistances: {
      fire: req.body.type ? req.body.type : 0,
      ice: req.body.type ? req.body.type : 0,
      lightning: req.body.type ? req.body.type : 0,
      water: req.body.type ? req.body.type : 0,
      earth: req.body.type ? req.body.type : 0,
      wind: req.body.type ? req.body.type : 0,
      light: req.body.type ? req.body.type : 0,
      dark: req.body.type ? req.body.type : 0
    }
  };
};
