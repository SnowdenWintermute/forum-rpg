const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");


// Wallet model
const Wallet = require("../../models/Wallet");

// @desc    Create wallet
// @route   POST api/createWallet
// @access  PRIVATE
router.post('/createWallet', passport.authenticate("jwt", { session: false }), (req, res) => {
    Wallet.findOne({user: req.user.id})
        .then(wallet => {
            if(wallet) {
                return res.status(400).json({walletExists: "User already has a wallet"})}
            else {
                const newWallet = new Wallet({
                    user: req.user.id
                })
                newWallet.save()
                    .then(res.status(200).json(newWallet))
                    .catech(err => res.status(400).json(err))
            }
        }      
    ).catch(err => res.status(401).json({notauthorized: "You must log in to create a wallet"}))
})

// @desc    Get user wallet
// @route   GET api/:userId/
// @access  PRIVATE
router.get('/:userId', passport.authenticate("jwt", { session: false }), (req, res) => {
    Wallet.findOne({user: req.user.id})
        .then(wallet =>
        res.status(200).json(wallet)
    ).catch(err => res.status(401).json({notauthorized: "You may only view your own wallet"}))
})

module.exports = router;