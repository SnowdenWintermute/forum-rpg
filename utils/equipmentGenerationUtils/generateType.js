getRandomInt = require("./getRandomInt");

module.exports = generateType = () => {
  // Generate Type
  let types = [
    "head",
    "body",
    "legs",
    "feet",
    "shoulders",
    "arms",
    "hands",
    "back",
    "ring",
    "neck",
    "hand",
    "ammunition"
  ];
  const rn = getRandomInt(1, 14);
  return types[rn - 1];
};
