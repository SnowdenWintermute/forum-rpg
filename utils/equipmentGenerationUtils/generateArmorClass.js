getRandomInt = require("./getRandomInt");

module.exports = function generateArmorClass(type, subType, level) {
  let armorClass;
  switch (type) {
    case "head":
    case "hands":
    case "feet":
    case "shoulders":
    case "arms":
      armorClass = getRandomInt(level, level + 2);
      break;
    case "body":
      armorClass = getRandomInt(level * 2, level * 2 + 4);
      break;
    case "back":
      armorClass = level;
      break;
    case "hand":
      if (subType === "shield") {
        armorClass = getRandomInt(
          Math.round(level * 1.5),
          Math.round(level * 1.5) + 4
        );
      }
      break;
    default:
      0;
  }
  return armorClass;
};
