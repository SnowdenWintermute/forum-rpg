generateDamage = require("./equipmentGenerationUtils/generateDamage");
generateType = require("./equipmentGenerationUtils/generateType");
generateSubType = require("./equipmentGenerationUtils/generateSubType");
generateDurability = require("./equipmentGenerationUtils/generateDurability");
generateArmorClass = require("./equipmentGenerationUtils/generateArmorClass");
generateStats = require("./equipmentGenerationUtils/generateStats");
generateName = require("./equipmentGenerationUtils/generateName");

module.exports = function equipmentGenerator(level, rarity) {
  // Generate Name

  const type = generateType();
  const subType = generateSubType(type);
  const handling =
    type === "hand"
      ? subType === "1hSword" ||
        subType === "1hClub" ||
        subType === "1hAxe" ||
        subType === "pistol" ||
        subType === "shield"
        ? "1h"
        : "2h"
      : "wearable";
  const damage = generateDamage(subType, level);
  const durability = generateDurability(type, level);
  const armorClass = generateArmorClass(type, subType, level);
  const stats = generateStats(subType, level, rarity);
  const name = generateName(type, subType, stats);

  const newEquipment = {
    name: name,
    type: type,
    subType: subType,
    handling: handling,
    rarity: rarity,
    preReqs: "", // todo
    durability: durability,
    damage: damage,
    armorClass: armorClass,
    hp: stats.hp,
    mp: stats.mp,
    bonusDamage: stats.bonusDamage,
    bonusArmorClass: stats.bonusArmorClass,
    str: stats.str,
    dex: stats.dex,
    int: stats.int,
    accuracy: stats.accuracy,
    magicAccuracy: stats.magicAccuracy,
    magicDefense: stats.magicDefense,
    armorPiercing: stats.armorPiercing,
    resistances: {
      fire: stats.resistances.fire,
      ice: stats.resistances.ice,
      lightning: stats.resistances.lightning,
      water: stats.resistances.water,
      earth: stats.resistances.earth,
      wind: stats.resistances.wind,
      light: stats.resistances.light,
      dark: stats.resistances.dark
    }
  };

  return newEquipment;
};
