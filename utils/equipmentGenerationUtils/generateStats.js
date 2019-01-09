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
    evasion: 0, //
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
  const suffixStats = ["hp", "stats", "magicDefense", "armorPiercing", "evasion"];

  generatePrefixSuffixStats = (subType, level) => {
    // Declare the potential prefix and suffix
    let potentialPrefixes = [];
    let potentialSuffixes = [];
    switch (subType) {
      case "cloth":
      case "leather":
      case "mail":
      case "plate":
        potentialPrefixes = [
          "bonusArmorClass",
          "mp",
          "elementalResistance",
          "magicAccuracy"
        ];
        potentialSuffixes = ["str", "dex", "int", "hp", "magicDefense", "evasion"];
        break;
      case "oneHandSword":
      case "oneHandClub":
      case "oneHandAxe":
      case "pistol":
        potentialPrefixes = ["magicAccuracy", "accuracy", "bonusDamage", "mp"];
        potentialSuffixes = ["str", "dex", "int", "armorPiercing", "hp"];
        break;
      case "twoHandSword":
      case "twoHandClub":
      case "twoHandAxe":
      case "polearm":
      case "bow":
      case "crossbow":
      case "rifle":
        potentialPrefixes = [
          "magicAccuracy",
          "accuracy",
          "bonusDamage",
          "mp",
          "elementalResistance"
        ];
        potentialSuffixes = [
          "str",
          "dex",
          "int",
          "armorPiercing",
          "hp",
          "magicDefense",
          "evasion"
        ];
        break;
      case "shield":
        potentialPrefixes = [
          "bonusArmorClass",
          "mp",
          "elementalResistance",
          "magicAccuracy"
        ];
        potentialSuffixes = ["str", "dex", "int", "hp", "magicDefense", "evasion"];
        break;
      case "ring":
      case "neck":
        potentialPrefixes = [
          "mp",
          "bonusDamage",
          "accuracy",
          "magicAccuracy",
          "resistances"
        ];
        potentialSuffixes = ["str", "dex", "int", "hp", "magicDefense", "evasion"];
        break;
      case "ammunition":
        potentialSuffixes = [""];
        potentialPrefixes = [""];
      default:
    }
    // Roll from list of potential mods
    const randomPrefix =
      potentialPrefixes[getRandomInt(0, potentialPrefixes.length - 1)];
    const randomSuffix =
      potentialSuffixes[getRandomInt(0, potentialSuffixes.length - 1)];

    // Determine rolls based on level and eq subType
    // PREFIX STATS
    switch (randomSuffix) {
      case "hp":
        stats.hp = getRandomInt(1, level * 2);
        break;
      case "str":
        stats.str = getRandomInt(1, level * 1);
        break;
      case "dex":
        stats.dex = getRandomInt(1, level * 1);
        break;
      case "int":
        stats.int = getRandomInt(1, level * 1);
        break;
      case "magicDefense":
        stats.magicDefense = getRandomInt(1, level * 2);
        break;
      case "evasion":
        stats.evasion = getRandomInt(1, level * 2)
      case "armorPiercing":
        stats.armorPiercing = getRandomInt(1, level * 1);
        break;
      default:
    }
    // SUFFIX STATS
    switch (randomPrefix) {
      case "mp":
        stats.mp = getRandomInt(1, level * 2);
        break;
      case "bonusDamage":
        stats.bonusDamage = getRandomInt(1, level * 1);
        break;
      case "bonusArmorClass":
        stats.bonusArmorClass = getRandomInt(1, level * 1);
        break;
      case "accuracy":
        stats.accuracy = getRandomInt(1, level * 2);
        break;
      case "magicAccuracy":
        stats.magicAccuracy = getRandomInt(1, level * 2);
        break;
      case "elementalResistance":
        const elements = [
          "fire",
          "ice",
          "lightning",
          "water",
          "wind",
          "earth",
          "light",
          "dark"
        ];

        const randomElement = elements[getRandomInt(0, elements.length - 1)];

        switch (randomElement) {
          case "fire":
            stats.resistances.fire = getRandomInt(1, level * 3);
            break;
          case "ice":
            stats.resistances.ice = getRandomInt(1, level * 3);
            break;
          case "lightning":
            stats.resistances.lightning = getRandomInt(1, level * 3);
            break;
          case "water":
            stats.resistances.water = getRandomInt(1, level * 3);
            break;
          case "wind":
            stats.resistances.wind = getRandomInt(1, level * 3);
            break;
          case "earth":
            stats.resistances.earth = getRandomInt(1, level * 3);
            break;
          case "light":
            stats.resistances.light = getRandomInt(1, level * 3);
            break;
          case "dark":
            stats.resistances.dark = getRandomInt(1, level * 3);
            break;
          default:
        }
        break;
      default:
    }
  };

  generatePrefixSuffixStats(subType, level);
  return stats;
};
