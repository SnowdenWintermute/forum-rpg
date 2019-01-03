const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  stats: {
    lvl: {
      type: Number,
      default: 1
    },
    exp: {
      current: {
        type: Number,
        default: 0
      },
      nextLevel: {
        type: Number,
        default: 100
      }
    },
    hp: {
      max: {
        type: Number,
        default: 10
      },
      current: {
        type: Number,
        default: 10
      }
    },
    mp: {
      max: {
        type: Number,
        default: 6
      },
      current: {
        type: Number,
        default: 6
      }
    },
    str: {
      type: Number,
      default: 1
    },
    dex: {
      type: Number,
      default: 1
    },
    int: {
      type: Number,
      default: 1
    }
  },
  spells: [
    {
      type: Object,
      default: {
        name: {
          type: String,
          default: ""
        },
        level: {
          type: Number,
          default: 1
        },
        exp: {
          current: {
            type: Number,
            default: 0
          },
          nextLevel: {
            type: Number,
            default: 100
          },
          timesCasted: {
            type: Number,
            default: 0
          }
        },
        element: {
          type: String,
          default: ""
        },
        target: {
          type: String,
          default: ""
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
    }
  ],
  equipment: {
    head: { type: Schema.Types.ObjectId, ref: "equipment" },
    body: { type: Schema.Types.ObjectId, ref: "equipment" },
    legs: { type: Schema.Types.ObjectId, ref: "equipment" },
    feet: { type: Schema.Types.ObjectId, ref: "equipment" },
    shoulders: { type: Schema.Types.ObjectId, ref: "equipment" },
    arms: { type: Schema.Types.ObjectId, ref: "equipment" },
    hands: { type: Schema.Types.ObjectId, ref: "equipment" },
    ringLeft: { type: Schema.Types.ObjectId, ref: "equipment" },
    ringRight: { type: Schema.Types.ObjectId, ref: "equipment" },
    neck: { type: Schema.Types.ObjectId, ref: "equipment" },
    rightHand: { type: Schema.Types.ObjectId, ref: "equipment" },
    leftHand: { type: Schema.Types.ObjectId, ref: "equipment" },
    ammunition: { type: Schema.Types.ObjectId, ref: "equipment" }
  },
  inventory: [
    {
      type: Schema.Types.ObjectId,
      ref: "equipment"
    }
  ]
});

module.exports = Character = mongoose.model("characters", CharacterSchema);
