getRandomInt = require("./getRandomInt");

module.exports = function generateArmorClass(type, level) {
  let armorClass;
  switch (type) {
    case "head" || "hands" || "feet" || "shoulders" || "arms":
      armorClass = getRandomInt(level, level + 2);
      break
    case "body":
      armorClass = getRandomInt(level * 2, level * 2 + 4);
      break
    case "back":
      armorClass = level;
      break
    case "shield":
      armorClass = getRandomInt(
        Math.round(level * 1.5),
        Math.round(level * 1.5) + 4
      );
      break
    default:
      0;
  }
  return armorClass;
};
