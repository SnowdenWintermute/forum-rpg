getRandomInt = require("./getRandomInt");

// hp [suffix] of the fox, wolf, lion, bear, whale
// str [suffix] of strength, might, power, giants, titans
// dex [suffix] of dexterity, proficiancy, finesse, mastery, perfection
// int [suffix] of intelligence, the mind, brilliance, sorcery, wizardry
// magicDefense [suffix] of cover, shelter, shielding, dispersal, diffusion
// armorPiercing [suffix] of piercing, stabbing, penetration, smashing, shattering

// mp [prefix] bluejay's, cockatoo's owl's, kea's, raven's
// bonusDamage [prefix] jagged, deadly, vicious, brutal, savage
// bonusArmorClass [prefix] sturdy, strong, robust, reinforced, unyeilding
// accuracy [prefix] steady, stable, sighted, guided, unwavering
// magicAccuracy [prefix] cryptic, esoteric, magical, mystical, arcane
      // [prefix] red, crimson, scarlet, garnet, ruby
      // [prefix] warm, padded, insulated, heated, frostproof
      // [prefix] blue, azure, lapis, cobalt, sapphire
      // [prefix] waterproof, airtight, watertight, sealed, hermetic
      // [prefix] yellow, amber, saffron, citrine, topaz
      // [prefix] smooth, sleek, contoured, streamlined, frictionless
      // [prefix] pure, sublime, hallowed, angelic, holy
      // [prefix] dim, shadowy, dark, black, void

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
    // Declare the potential prefix and suffix
    switch (type) {
      case "cloth" || "leather" || "mail" || "plate":
        const potentialPrefixes = ["bonusArmorClass", "mp", "elementalResistance", "magicAccuracy"]
        const potentialSuffixes = ["str", "dex", "int", "hp", "magic defense"]
      case "1hSword" ||
        "1hClub" ||
        "1hAxe" ||
        "pistol":
        const potentialPrefixes = ["magicAccuracy", "Accuracy", "bonusDamage", "mp"]
        const potentialSuffixes = ["str", "dex", "int", "armorPiercing", "hp"]
      case "2hSword" || "2hClub" || "2hAxe" || "polearm" || "bow" || "crossbow" || "rifle":
        const potentialPrefixes = ["magicAccuracy", "Accuracy", "bonusDamage", "mp", "elementalResistance"]
        const potentialSuffixes = ["str", "dex", "int", "armorPiercing", "hp", "magic defense"]
      case "shield":
        const potentialPrefixes= ["bonusArmorClass", "mp", "elementalResistance", "magicAccuracy"]
        const potentialSuffixes = ["str", "dex", "int", "hp", "magic defense"]
      default:
    }
    // Roll from list of potential mods
    const randomPrefix = potentialPrefixes[getRandomInt(potentialPrefixes.length-1)]
    const randomSuffix = potentialSuffixes[getRandomInt(potentialSuffixes.length-1)]
    // Determine rolls based on level and eq type
    switch(randomPrefix){
      case "hp":
        stats.hp = level * 2
      case "str":
        stats.str = level * 1
      case "dex":
        stats.dex = level * 1
      case "int":
        stats.int = level * 1
      case "magicDefense":
        stats.int = level * 2
      case "armorPiercing":
        stats.armorPiercing = level * 1
      default:
    }
    switch(randomSuffix){
      case "mp":
        stats.mp = level * 2
      case "bonusDamage":
        stats.bonusDamage = level * 1
      case "bonusArmorClass":
        stats.bonusArmorClass = level * 1
      case "accuracy":
        stats.accuracy = level * 2
      case "magicAccuracy":
        stats.magicAccuracy = level * 2
      case "elementalResistance":
        const elements = ["fire", "ice", "lightning", "water", "wind", "earth", "light", "dark"]
        const randomElement = elements[getRandomInt(elements.length-1)]
        switch(randomElement){
          case "fire":
          default:
        }
      default:
    }

  };
};
