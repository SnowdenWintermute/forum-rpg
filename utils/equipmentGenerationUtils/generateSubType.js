getRandomInt = require("./getRandomInt");

module.exports = generateSubType = type => {
  // Generate Sub-Type
  let subTypes;
  let subType;
  if (
    type === "head" ||
    type === "body" ||
    type === "legs" ||
    type === "feet" ||
    type === "shoulders" ||
    type === "arms" ||
    type === "hands" ||
    type === "back"
  ) {
    subTypes = ["cloth", "leather", "mail", "plate"];
    const rn = getRandomInt(0, subTypes.length - 1);
    subType = subTypes[rn];
  } else if (type === "hand") {
    subTypes = [
      "1hSword",
      "2hSword",
      "1hClub",
      "2hClub",
      "1hAxe",
      "2hAxe",
      "polearm",
      "bow",
      "crossbow",
      "pistol",
      "rifle",
      "shield"
    ];
    const rn = getRandomInt(0, subTypes.length - 1);
    subType = subTypes[rn];
  } else if (type === "ammunition") {
    subTypes = ["arrow", "bolt", "bullet"];
    const rn = getRandomInt(0, subTypes.length - 1);
    subType = subTypes[rn];
  } else if (type === "ring") {
    subType = "ring";
  } else if (type === "neck") {
    subType = "neck";
  }

  return subType;
};
