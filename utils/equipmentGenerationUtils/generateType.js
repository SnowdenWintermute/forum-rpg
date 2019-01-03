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
    "ring",
    "neck",
    "hand",
    "hand",
    "hand",
    "hand",
    "hand",
    "hand",
    "ammunition"
  ];
  const rn = getRandomInt(0, types.length - 1);
  return types[rn];
};
