getRandomInt = require("./getRandomInt");

module.exports = function generateArmorClass(subType, level) {
  let armorClass;
  switch (subType) {
    case "head" || "hands" || "feet" || "shoulders" || "arms":
      armorClass = getRandomInt(level, level + 2);
    case "body":
      armorClass = getRandomInt(level * 2, level * 2 + 4);
    case "back":
      armorClass = level;
    case "shield":
      armorClass = getRandomInt(
        Math.round(level * 1.5),
        Math.round(level * 1.5) + 4
      );
    default:
      0;
  }
  return armorClass;
};
