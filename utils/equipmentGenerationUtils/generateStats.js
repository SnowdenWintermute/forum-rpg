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

  generatePrefixSuffixStats = (subType, level) => {
    // Declare the potential prefix and suffix
    let potentialPrefixes = []
    let potentialSuffixes = []
    switch (subType) {
      case "cloth" || "leather" || "mail" || "plate":
        potentialPrefixes = ["bonusArmorClass", "mp", "elementalResistance", "magicAccuracy"]
        potentialSuffixes = ["str", "dex", "int", "hp", "magic defense"]
        break
      case "1hSword" ||
        "1hClub" ||
        "1hAxe" ||
        "pistol":
        potentialPrefixes = ["magicAccuracy", "Accuracy", "bonusDamage", "mp"]
        potentialSuffixes = ["str", "dex", "int", "armorPiercing", "hp"]
        break
      case "2hSword" || "2hClub" || "2hAxe" || "polearm" || "bow" || "crossbow" || "rifle":
        potentialPrefixes = ["magicAccuracy", "Accuracy", "bonusDamage", "mp", "elementalResistance"]
        potentialSuffixes = ["str", "dex", "int", "armorPiercing", "hp", "magic defense"]
        break
      case "shield":
        potentialPrefixes = ["bonusArmorClass", "mp", "elementalResistance", "magicAccuracy"]
        potentialSuffixes = ["str", "dex", "int", "hp", "magic defense"]
        break
      default:
    }
    // Roll from list of potential mods
    const randomPrefix = potentialPrefixes[getRandomInt(potentialPrefixes.length-1)]
    const randomSuffix = potentialSuffixes[getRandomInt(potentialSuffixes.length-1)]
    // Determine rolls based on level and eq subType
    switch(randomPrefix){
      case "hp":
        stats.hp = level * 2
        break
      case "str":
        stats.str = level * 1
        break
      case "dex":
        stats.dex = level * 1
        break
      case "int":
        stats.int = level * 1
        break
      case "magicDefense":
        stats.int = level * 2
        break
      case "armorPiercing":
        stats.armorPiercing = level * 1
        break
      default:
    }
    switch(randomSuffix){
      case "mp":
        stats.mp = level * 2
        break
      case "bonusDamage":
        stats.bonusDamage = level * 1
        break
      case "bonusArmorClass":
        stats.bonusArmorClass = level * 1
        break
      case "accuracy":
        stats.accuracy = level * 2
        break
      case "magicAccuracy":
        stats.magicAccuracy = level * 2
        break
      case "elementalResistance":
        const elements = ["fire", "ice", "lightning", "water", "wind", "earth", "light", "dark"]
        const randomElement = elements[getRandomInt(elements.length-1)]
        switch(randomElement){
          case "fire":
            stats.resistances.fire = level * 3
            break
          case "ice":
            stats.resistances.ice = level * 3
            break
          case "lightning":
            stats.resistances.lightning = level * 3
            break
          case "water":
            stats.resistances.water = level * 3
            break
          case "wind":
            stats.resistances.wind = level * 3
            break
          case "earth":
            stats.resistances.earth = level * 3
            break
          case "light":
            stats.resistances.light = level * 3
            break
          case "dark":
            stats.resistances.dark = level * 3
            break
          default:
        }
        break
      default:
    }
  };
  generatePrefixSuffixStats(subType,level)
  return stats
};
