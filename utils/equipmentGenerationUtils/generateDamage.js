getRandomInt = require("./getRandomInt");

module.exports = function generateDamage(subType, level) {
  let damage;
  console.log("subType Dmg");
  console.log(subType);
  switch (subType) {
    case "oneHandSword":
    case "oneHandClub":
    case "oneHandAxe":
    case "pistol":
      {
        damage = {
          min: 1 + level,
          max: Math.round((1 + level) * 1.5)
        };
      }
      break;
    case "twoHandSword":
    case "twoHandClub":
    case "twoHandAxe":
    case "polearm":
    case "bow":
    case "crossbow":
    case "rifle":
      {
        damage = {
          min: 2 + level * 2,
          max: Math.round((2 + level * 2) * 1.5)
        };
      }
      break;
    default: {
      damage = {
        min: 0,
        max: 0
      };
    }
  }
  console.log(damage);
  return damage;
};
