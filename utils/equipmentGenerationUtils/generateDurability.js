getRandomInt = require("./getRandomInt");

module.exports = generateDurability = (type, level) => {
  // Generate durability
  let durability;
  if (
    type === "head" ||
    type === "body" ||
    type === "legs" ||
    type === "feet" ||
    type === "shoulders" ||
    type === "arms" ||
    type === "hands"
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
  if (type === "ammunition") {
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
