getRandomInt = require("./getRandomInt");

module.exports = generateName = (type, subType, stats) => {
  console.log("--namer");
  let suffix, prefix, base;

  // BASE NAME
  if (type === "head") {
    if (subType === "cloth") {
      base = "Cap";
    }
    if (subType === "leather") {
      base = "Hat";
    }
    if (subType === "mail") {
      base = "Coif";
    }
    if (subType === "plate") {
      base = "Helm";
    }
  }
  if (type === "body") {
    if (subType === "cloth") {
      base = "Robe";
    }
    if (subType === "leather") {
      base = "Armor";
    }
    if (subType === "mail") {
      base = "Mail";
    }
    if (subType === "plate") {
      base = "Plate";
    }
  }
  if (type === "legs") {
    if (subType === "cloth") {
      base = "Slacks";
    }
    if (subType === "leather") {
      base = "Leather Leggings";
    }
    if (subType === "mail") {
      base = "Chausses";
    }
    if (subType === "plate") {
      base = "Plate Leggings";
    }
  }
  if (type === "feet") {
    if (subType === "cloth") {
      base = "Shoes";
    }
    if (subType === "leather") {
      base = "Leather Boots";
    }
    if (subType === "mail") {
      base = "Mail Boots";
    }
    if (subType === "plate") {
      base = "Greaves";
    }
  }
  if (type === "shoulders") {
    if (subType === "cloth") {
      base = "Cloth Shoulderpads";
    }
    if (subType === "leather") {
      base = "Leather Shoulderpads";
    }
    if (subType === "mail") {
      base = "Mail Shoulderpads";
    }
    if (subType === "plate") {
      base = "Spaulders";
    }
  }
  if (type === "arms") {
    if (subType === "cloth") {
      base = "Sleves";
    }
    if (subType === "leather") {
      base = "Armguards";
    }
    if (subType === "mail") {
      base = "Mail Sleves";
    }
    if (subType === "plate") {
      base = "Vambraces";
    }
  }
  if (type === "hands") {
    if (subType === "cloth") {
      base = "Gloves";
    }
    if (subType === "leather") {
      base = "Leather Gloves";
    }
    if (subType === "mail") {
      base = "Mail Gloves";
    }
    if (subType === "plate") {
      base = "Gauntlets";
    }
  }
  if (type === "back") {
    if (subType === "cloth") {
      base = "Cape";
    }
    if (subType === "leather") {
      base = "Leather Cape";
    }
    if (subType === "mail") {
      base = "Mail Cape";
    }
    if (subType === "plate") {
      base = "Backplate";
    }
  }
  if (type === "ring") {
    base = "Ring";
  }
  if (type === "neck") {
    base = "Amulet";
  }

  // Weapons
  if (type === "hand") {
    if (subType === "oneHandSword") {
      base = "Sword";
    }
    if (subType === "twoHandSword") {
      base = "Katana";
    }
    if (subType === "oneHandClub") {
      base = "Mace";
    }
    if (subType === "twoHandClub") {
      base = "Staff";
    }
    if (subType === "oneHandAxe") {
      base = "Axe";
    }
    if (subType === "twoHandAxe") {
      base = "Greataxe";
    }
    if (subType === "polearm") {
      base = "Polearm";
    }
    if (subType === "bow") {
      base = "Bow";
    }
    if (subType === "crossbow") {
      base = "Crossbow";
    }
    if (subType === "pistol") {
      base = "Pistol";
    }
    if (subType === "rifle") {
      base = "Rifle";
    }
    if (subType === "shield") {
      base = "Shield";
    }
  }

  // Amunition
  if (type === "ammunition") {
    if (subType === "arrow") {
      base = "Arrow";
    }
    if (subType === "bolt") {
      base = "Bolt";
    }
    if (subType === "bullet") {
      base = "Bullet";
    }
  }

  // SUFFIX
  if (stats.hp > 0) {
    // hp [suffix] of the fox, wolf, lion, bear, whale
    if (stats.hp > 16) {
      suffix = "of the Whale";
    } else if (stats.hp > 12) {
      suffix = "of the Bear";
    } else if (stats.hp > 8) {
      suffix = "of the Lion";
    } else if (stats.hp > 4) {
      suffix = "of the Wolf";
    } else if (stats.hp > 0) {
      suffix = "of the Fox";
    }
  }
  if (stats.str > 0) {
    // str [suffix] of strength, might, power, giants, titans
    if (stats.str > 8) {
      suffix = "of Titans";
    } else if (stats.str > 6) {
      suffix = "of Might";
    } else if (stats.str > 4) {
      suffix = "of Power";
    } else if (stats.str > 2) {
      suffix = "of Giants";
    } else if (stats.str > 0) {
      suffix = "of Strength";
    }
  }
  if (stats.dex > 0) {
    // dex [suffix] of dexterity, proficiancy, finesse, mastery, perfection
    if (stats.dex > 8) {
      suffix = "of Perfection";
    } else if (stats.dex > 6) {
      suffix = "of Mastery";
    } else if (stats.dex > 4) {
      suffix = "of Proficiancy";
    } else if (stats.dex > 2) {
      suffix = "of Finesse";
    } else if (stats.dex > 0) {
      suffix = "of Dexterity";
    }
  }
  if (stats.int > 0) {
    // int [suffix] of intelligence, the mind, brilliance, sorcery, wizardry
    if (stats.int > 8) {
      suffix = "of Wizardry";
    } else if (stats.int > 6) {
      suffix = "of Sorcery";
    } else if (stats.int > 4) {
      suffix = "of Brilliance";
    } else if (stats.int > 2) {
      suffix = "of the Mind";
    } else if (stats.int > 0) {
      suffix = "of Intelligence";
    }
  }
  if (stats.magicDefense > 0) {
    // magicDefense [suffix] of cover, shelter, shielding, dispersal, diffusion
    if (stats.magicDefense > 16) {
      suffix = "of Diffusion";
    } else if (stats.magicDefense > 12) {
      suffix = "of Dispersal";
    } else if (stats.magicDefense > 8) {
      suffix = "of Shielding";
    } else if (stats.magicDefense > 4) {
      suffix = "of Shelter";
    } else if (stats.magicDefense > 0) {
      suffix = "of Cover";
    }
  }
  if (stats.armorPiercing > 0) {
    // armorPiercing [suffix] of piercing, stabbing, penetration, smashing, shattering
    if (stats.armorPiercing > 8) {
      suffix = "of Shattering";
    } else if (stats.armorPiercing > 6) {
      suffix = "of Smashing";
    } else if (stats.armorPiercing > 4) {
      suffix = "of Penetration";
    } else if (stats.armorPiercing > 2) {
      suffix = "of Stabbing";
    } else if (stats.armorPiercing > 0) {
      suffix = "of Piercing";
    }
  }
  //
  //      PREFIXES
  //
  if (stats.mp > 0) {
    // mp [prefix] bluejay's, cockatoo's owl's, kea's, raven's
    if (stats.mp > 16) {
      prefix = "Raven's";
    } else if (stats.mp > 12) {
      prefix = "Kea's";
    } else if (stats.mp > 8) {
      prefix = "Owl's";
    } else if (stats.mp > 4) {
      prefix = "Cockatoo's";
    } else if (stats.mp > 0) {
      prefix = "Bluejay's";
    }
  }
  if (stats.bonusDamage > 0) {
    // bonusDamage [prefix] jagged, deadly, vicious, brutal, savage
    if (stats.bonusDamage > 8) {
      prefix = "Savage";
    } else if (stats.bonusDamage > 6) {
      prefix = "Brutal";
    } else if (stats.bonusDamage > 4) {
      prefix = "Vicious";
    } else if (stats.bonusDamage > 2) {
      prefix = "Deadly";
    } else if (stats.bonusDamage > 0) {
      prefix = "Jagged";
    }
  }
  if (stats.bonusArmorClass > 0) {
    // bonusArmorClass [prefix] sturdy, strong, robust, reinforced, unyeilding
    if (stats.bonusArmorClass > 8) {
      prefix = "Unyielding";
    } else if (stats.bonusArmorClass > 6) {
      prefix = "Reinforced";
    } else if (stats.bonusArmorClass > 4) {
      prefix = "Robust";
    } else if (stats.bonusArmorClass > 2) {
      prefix = "Strong";
    } else if (stats.bonusArmorClass > 0) {
      prefix = "Sturdy";
    }
  }
  if (stats.accuracy > 0) {
    // accuracy [prefix] steady, stable, unwavering, sighted, guided
    if (stats.accuracy > 16) {
      prefix = "Guided";
    } else if (stats.accuracy > 12) {
      prefix = "Sighted";
    } else if (stats.accuracy > 8) {
      prefix = "Unwavering";
    } else if (stats.accuracy > 4) {
      prefix = "Stable";
    } else if (stats.accuracy > 0) {
      prefix = "Steady";
    }
  }
  if (stats.magicAccuracy > 0) {
    // magicAccuracy [prefix] cryptic, esoteric, magical, mystical, arcane
    if (stats.magicAccuracy > 8) {
      prefix = "Arcane";
    } else if (stats.magicAccuracy > 6) {
      prefix = "Mystical";
    } else if (stats.magicAccuracy > 4) {
      prefix = "Magical";
    } else if (stats.magicAccuracy > 2) {
      prefix = "Esoteric";
    } else if (stats.magicAccuracy > 0) {
      prefix = "Cryptic";
    }
  }
  if (stats.resistances.fire > 0) {
    // [prefix] red, crimson, scarlet, garnet, ruby
    if (stats.resistances.fire > 24) {
      prefix = "Ruby";
    } else if (stats.resistances.fire > 18) {
      prefix = "Garnet";
    } else if (stats.resistances.fire > 12) {
      prefix = "Scarlet";
    } else if (stats.resistances.fire > 6) {
      prefix = "Crimson";
    } else if (stats.resistances.fire > 0) {
      prefix = "Red";
    }
  }
  if (stats.resistances.ice > 0) {
    // [prefix] warm, padded, insulated, heated, frostproof
    if (stats.resistances.ice > 24) {
      prefix = "Frostproof";
    } else if (stats.resistances.ice > 18) {
      prefix = "Heated";
    } else if (stats.resistances.ice > 12) {
      prefix = "Insulated";
    } else if (stats.resistances.ice > 6) {
      prefix = "Padded";
    } else if (stats.resistances.ice > 0) {
      prefix = "Warm";
    }
  }
  if (stats.resistances.lightning > 0) {
    // [prefix] blue, azure, lapis, cobalt, sapphire
    if (stats.resistances.lightning > 24) {
      prefix = "Sapphire";
    } else if (stats.resistances.lightning > 18) {
      prefix = "Cobalt";
    } else if (stats.resistances.lightning > 12) {
      prefix = "Lapis";
    } else if (stats.resistances.lightning > 6) {
      prefix = "Azure";
    } else if (stats.resistances.lightning > 0) {
      prefix = "Blue";
    }
  }
  if (stats.resistances.water > 0) {
    // [prefix] waterproof, airtight, watertight, sealed, hermetic
    if (stats.resistances > 24) {
      prefix = "Hermetic";
    } else if (stats.resistances.water > 18) {
      prefix = "Sealed";
    } else if (stats.resistances.water > 12) {
      prefix = "Watertight";
    } else if (stats.resistances.water > 6) {
      prefix = "Airtight";
    } else if (stats.resistances.water > 0) {
      prefix = "Waterproof";
    }
  }
  if (stats.resistances.earth > 0) {
    // [prefix] yellow, amber, saffron, citrine, topaz
    if (stats.resistances.earth > 24) {
      prefix = "Topaz";
    } else if (stats.resistances.earth > 18) {
      prefix = "Citrine";
    } else if (stats.resistances.earth > 12) {
      prefix = "Saffron";
    } else if (stats.resistances.earth > 6) {
      prefix = "Amber";
    } else if (stats.resistances.earth > 0) {
      prefix = "Yellow";
    }
  }
  if (stats.resistances.wind > 0) {
    // [prefix] smooth, sleek, contoured, streamlined, frictionless
    if (stats.resistances.wind > 24) {
      prefix = "Frictionless";
    } else if (stats.resistances.wind > 18) {
      prefix = "Streamlined";
    } else if (stats.resistances.wind > 12) {
      prefix = "Contoured";
    } else if (stats.resistances.wind > 6) {
      prefix = "Sleek";
    } else if (stats.resistances.wind > 0) {
      prefix = "Smooth";
    }
  }
  if (stats.resistances.light > 0) {
    // [prefix] pure, sublime, hallowed, angelic, holy
    if (stats.resistances.light > 24) {
      prefix = "Holy";
    } else if (stats.resistances.light > 18) {
      prefix = "Angelic";
    } else if (stats.resistances.light > 12) {
      prefix = "Hallowed";
    } else if (stats.resistances.light > 6) {
      prefix = "Sublime";
    } else if (stats.resistances.light > 0) {
      prefix = "Pure";
    }
  }
  if (stats.resistances.dark > 0) {
    // [prefix] dim, shadowy, dark, black, Vanta-Black
    if (stats.resistances.dark > 24) {
      prefix = "Vanta-Black";
    } else if (stats.resistances.dark > 18) {
      prefix = "Black";
    } else if (stats.resistances.dark > 12) {
      prefix = "Dark";
    } else if (stats.resistances.dark > 6) {
      prefix = "Shadowy";
    } else if (stats.resistances.dark > 0) {
      prefix = "Dim";
    }
  }

  console.log("suffix " + suffix);
  console.log("pre " + prefix);
  console.log("--endofnamer");
  const name = `${prefix} ${base} ${suffix}`;
  if (type === "ammunition") {
    name = base;
  }
  return name;
};
