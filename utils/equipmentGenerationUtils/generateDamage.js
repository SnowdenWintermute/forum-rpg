getRandomInt = require("./getRandomInt");

module.exports = function generateDamage(subType, level) {
  let damage;
  switch (subType) {
    case "1hSword" || "1hClub" || "1hAxe" || "pistol": {
      damage = {
        min: 1 + level,
        max: Math.round((1 + level) * 1.5)
      };
    }
    case "2hSword" ||
      "2hClub" ||
      "2hAxe" ||
      "polearm" ||
      "bow" ||
      "crossbow" ||
      "rifle": {
      damage = {
        min: 2 + level * 2,
        max: Math.round((2 + level * 2) * 1.5)
      };
    }
    default: {
      damage = {
        min: 0,
        max: 0
      };
    }
  }
  return damage;
};
