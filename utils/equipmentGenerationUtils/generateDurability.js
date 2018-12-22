getRandomInt = require("./getRandomInt");

module.exports = generateDurability = (level, type) => { // Generate durability
  let durability;
  if (
    type === "head" ||
    "body" ||
    "legs" ||
    "feet" ||
    "shoulders" ||
    "arms" ||
    "hands" ||
    "back"
  ) {
    durability = {
      max: 10 + level * 5,
      current: getRandomInt(1, 10 + level * 5)
    };
  }
  if (type === "hand") {
    durability = {
      max: 10 + level * 5,
      current: getRandomInt(1, 10 + level * 5)
    };
  }
  if (type === "ammuntition") {
    durability = {
      max: 1,
      current: 1
    };
  }
  if (type === "ring") {
    durability = {
      max: 100,
      current: 100
    };
  }
  if (type === "neck") {
    durability = {
      max: 100,
      current: 100
    };
  }
  return durability;
};
