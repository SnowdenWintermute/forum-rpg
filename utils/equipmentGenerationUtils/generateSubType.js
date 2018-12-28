getRandomInt = require("./getRandomInt");

module.exports = generateSubType = type => {
  // Generate Sub-Type

  const armors = ["cloth", "leather", "mail", "plate"];
  const weapons = [
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
  const ammunitions = ["arrow", "bolt", "bullet"];

  const subTypeLookup = {
    head: armors,
    body: armors,
    legs: armors,
    feet: armors,
    shoulders: armors,
    arms: armors,
    hands: armors,
    back: armors,
    hand: weapons,
    ammunition: ammunitions,
    ring: ["ring"],
    neck: ["neck"]
  };

  const subTypes = subTypeLookup[type];
  const rn = getRandomInt(0, subTypes.length - 1);
  return subTypes[rn];
};
