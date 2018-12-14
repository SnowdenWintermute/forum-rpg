const moment = require("moment");

module.exports = function payoutCalculator(
  user,
  type,
  firstAmount,
  firstNote,
  amount,
  note,
  modifier
) {
  // Payout
  Wallet.findOne({ user: user.id }).then(wallet => {
    // Get all past transactions and sort for this type
    let payouts;
    if (wallet.transactions !== []) {
      payouts = wallet.transactions.filter(
        transaction => transaction.from === type
      );
    }
    // Find the most recent payout
    recentPayout = payouts => {
      // Start with an old date to compare to
      let result = {
        date: new Date("1995-12-17T03:24:00")
      };
      // Check for most recent payout of this type
      for (payout of payouts) {
        if (payout.date > result.date) result = payout;
      }
      return result;
    };
    let old = new Date("1995-12-17T03:24:00");
    // Store most recent payout in variable
    const recent = recentPayout(payouts);

    // Check recent payout against current time and pay accordingly
    if (recent.date.toString() === old.toString()) {
      // If no past transactions, payout
      wallet.transactions.unshift({
        amount: firstAmount,
        from: type,
        to: user.name,
        date: Date.now(),
        note: firstNote
      });

      wallet.balance += firstAmount;
    } else if (moment(recent.date).add(60, "m") < Date.now()) {
      // Else, check most recent transaction against new thread date
      wallet.transactions.unshift({
        amount: amount,
        from: type,
        to: user.name,
        date: Date.now(),
        note: note
      });

      wallet.balance += amount;
    } else {
      // Else give a percentage pittance
      const elapsed = moment(
        Date.now() - moment(recent.date).add(60, "m")
      ).format("mm");
      const payout = Math.floor(elapsed * modifier);
      if (payout > 0) {
        wallet.transactions.unshift({
          amount: payout,
          from: type,
          to: user.name,
          date: Date.now(),
          note: note
        });

        wallet.balance += payout;
      }
    }

    wallet.save();
  });
};
