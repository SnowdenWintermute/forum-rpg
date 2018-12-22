const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentClassSchema = new Schema({
  default: {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    name: {
      type: String,
      default: "Empty"
    },
    Type: {
      type: String,
      default: ""
    },
    subType: {
      type: String,
      default: ""
    },
    handling: {
      type: String,
      default: ""
    },
    rarity: {
      type: String,
      default: ""
    },
    preReqs: {
      lvl: {
        type: Number,
        default: 0
      },
      stats: {
        str: {
          type: Number,
          default: 0
        },
        dex: {
          type: Number,
          default: 0
        },
        int: {
          type: Number,
          default: 0
        }
      }
    },
    durability: {
      max: {
        type: Number,
        default: 0
      },
      current: {
        type: Number,
        default: 0
      }
    },
    damage: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 0
      }
    },
    armorClass: {
      type: Number,
      default: 0
    },
    hp: {
      type: Number,
      default: 0
    },
    mp: {
      type: Number,
      default: 0
    },
    bonusDamage: {
      type: Number,
      default: 0
    },
    bonusArmorClass: {
      type: Number,
      default: 0
    },
    str: {
      type: Number,
      default: 0
    },
    dex: {
      type: Number,
      default: 0
    },
    int: {
      type: Number,
      default: 0
    },
    accuracy: {
      type: Number,
      default: 0
    },
    magicAccuracy: {
      type: Number,
      default: 0
    },
    magicDefense: {
      type: Number,
      default: 0
    },
    armorPiercing: {
      type: Number,
      default: 0
    },
    resistances: {
      fire: {
        type: Number,
        default: 0
      },
      ice: {
        type: Number,
        default: 0
      },
      lightning: {
        type: Number,
        default: 0
      },
      water: {
        type: Number,
        default: 0
      },
      earth: {
        type: Number,
        default: 0
      },
      wind: {
        type: Number,
        default: 0
      },
      light: {
        type: Number,
        default: 0
      },
      dark: {
        type: Number,
        default: 0
      }
    }
  }
});

module.exports = Equipment = mongoose.model("equipment", EquipmentClassSchema);
