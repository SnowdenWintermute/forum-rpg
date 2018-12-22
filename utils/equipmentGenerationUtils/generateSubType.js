getRandomInt = require("./getRandomInt");

module.exports = generateSubType = type => {
  // Generate Sub-Type
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
    let subTypes = ["cloth", "leather", "mail", "plate"];
    const rn = getRandomInt(1, 4);
    return subTypes[rn - 1];
  }
  if (type === "hand") {
    let subTypes = [
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
    const rn = getRandomInt(1, 10);
    return subTypes[rn - 1];
  }
  if (type === "ammuntition") {
    let subTypes = ["arrow", "bolt", "bullet"];
    const rn = getRandomInt(1, 3);
    return subTypes[rn - 1];
  }
  if (type === "ring") return "ring";
  if (type === "neck") return "amulet";
};
