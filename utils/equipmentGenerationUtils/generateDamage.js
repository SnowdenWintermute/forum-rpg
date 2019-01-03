getRandomInt = require("./getRandomInt");

module.exports = function generateDamage(subType, level) {
  let damage;
  console.log("subType Dmg");
  console.log(subType);
  switch (subType) {
    case "1hSword":
    case "1hClub":
    case "1hAxe":
    case "pistol":
      {
        damage = {
          min: 1 + level,
          max: Math.round((1 + level) * 1.5)
        };
      }
      break;
    case "2hSword":
    case "2hClub":
    case "2hAxe":
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
