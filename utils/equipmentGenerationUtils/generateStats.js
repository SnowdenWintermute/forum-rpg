getRandomInt = require("./getRandomInt");

module.exports = generateStats = (subType, level, rarity) => {
  let stats = {
    hp: 0, // [suffix] of the fox, wolf, lion, bear, whale
    mp: 0, // [prefix] bluejay's, cockatoo's owl's, kea's, raven's
    str: 0, // [suffix] of strength, might, power, giants, titans
    dex: 0, // [suffix] of dexterity, proficiancy, finesse, mastery, perfection
    int: 0, // [suffix] of intelligence, the mind, brilliance, sorcery, wizardry
    bonusDamage: 0, // [prefix] jagged, deadly, vicious, brutal, savage
    bonusArmorClass: 0, // [prefix] sturdy, strong, robust, reinforced, unyeilding
    accuracy: 0, // [prefix] steady, stable, sighted, guided, unwavering
    magicAccuracy: 0, // [prefix] cryptic, esoteric, magical, mystical, arcane
    magicDefense: 0, // [suffix] of cover, shelter, shielding, dispersal, diffusion
    armorPiercing: 0, // [suffix] of piercing, stabbing, penetration, smashing, shattering
    resistances: {
      fire: 0, // [prefix] red, crimson, scarlet, garnet, ruby
      ice: 0, // [prefix] warm, padded, insulated, heated, frostproof
      lightning: 0, // [prefix] blue, azure, lapis, cobalt, sapphire
      water: 0, // [prefix] waterproof, airtight, watertight, sealed, hermetic
      earth: 0, // [prefix] yellow, amber, saffron, citrine, topaz
      wind: 0, // [prefix] smooth, sleek, contoured, streamlined, frictionless
      light: 0, // [prefix] pure, sublime, hallowed, angelic, holy
      dark: 0 // [prefix] dim, shadowy, dark, black, void
    }
  };
  const prefixStats = [
    "mp",
    "bonusDamage",
    "bonusArmorClass",
    "accuracy",
    "magicAccuracy",
    "resistances"
  ];
  const suffixStats = ["hp", "stats", "magicDefense", "armorPiercing"];

  generatePrefixStats = (type, level) => {
    switch (type) {
      case "cloth" || "leather" || "mail" || "plate":
      case "1hSword" ||
        "2hSword" ||
        "1hClub" ||
        "2hClub" ||
        "1hAxe" ||
        "2hAxe" ||
        "polearm" ||
        "bow" ||
        "crossbow" ||
        "pistol" ||
        "rifle":
      case "shield":
      default:
    }
  };
};
