const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Wallet = require("../../models/Wallet");
const Character = require("../../models/Character");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if user already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json({ errors });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            // Set up wallet
            .then(user => {
              Wallet.findOne({ user: user.id })
                .then(wallet => {
                  if (wallet) {
                    return res
                      .status(400)
                      .json({ walletExists: "User already has a wallet" });
                  } else {
                    const newWallet = new Wallet({
                      user: user.id
                    });
                    newWallet
                      .save()
                      // Create blank character sheet
                      .then(user => {
                        console.log(user);
                        Character.findOne({ user: user.id }).then(character => {
                          if (character) {
                            return res.status(400).json({
                              characterexists: "User already has a character"
                            });
                          } else {
                            const newCharacter = new Character({
                              user: user.id
                            });
                            newCharacter.save();
                            console.log(user);
                          }
                        });
                      })
                      .then(res.status(200).json(newWallet))
                      .catch(err => res.status(400).json(err));
                  }
                })
                .catch(err =>
                  res.status(401).json({
                    notauthorized: "You must log in to create a wallet"
                  })
                );
            })
            .catch(err => res.status(400).json({ error: "custom error" }));
        });
      });
    }
  });
  // User.findOne({ email: req.body.email }).then(user =>
  //   Wallet.findOne({ user: user.id })
  //     .then(wallet => {
  //       if (wallet) {
  //         return res
  //           .status(400)
  //           .json({ walletExists: "User already has a wallet" });
  //       } else {
  //         const newWallet = new Wallet({
  //           user: user.id
  //         });
  //         newWallet
  //           .save()
  //           .then(res.status(200).json(newWallet))
  //           .catch(err => res.status(400).json(err));
  //       }
  //     })
  //     .catch(err =>
  //       res
  //         .status(401)
  //         .json({ notauthorized: "You must log in to create a wallet" })
  //     )
  // )
});

// @route   POST api/users/login
// @desc    Login user / return JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user exists
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        const payload = { id: user.id, name: user.name }; // Create jwt payload

        // Sign the Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
