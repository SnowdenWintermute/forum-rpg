const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  balance: {
      type: Number,
      default: 0
  },
  transactions: [
        {
            ammount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now()
            },
            from: {
                type: String,
                default: null
            },
            to: {
                type: String,
                default: null
            },
            note: {
                type: String,
                required: true
            }
        }
    ]
  
});

module.exports = Wallet = mongoose.model("wallets", WalletSchema);
