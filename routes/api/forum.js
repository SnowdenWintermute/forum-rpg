const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const threadIdGenerator = require("../../utils/threadIdGenerator");

// Thread model
const Thread = require("../../models/Thread");
// Wallet model
const Wallet = require("../../models/Wallet");

// Validation
const validateThreadInput = require("../../validation/thread");
const validateReplyInput = require("../../validation/reply");

// @desc    Get all threads in section
// @route   GET api/:forumSection/
// @access  PUBLIC
router.get("/:forumSection", (req, res) => {
  Thread.find({ forumSection: req.params.forumSection })
    .sort({ date: -1 })
    .then(threads => {
      res.json(threads);
    })
    .catch(err => res.status(404).json({ nothreadfound: "No thread found" }));
});

// @desc    Get thread by ID
// @route   GET api/:forumSection/:threadId
// @access  PUBLIC
router.get("/:forumSection/:threadId", (req, res) => {
  Thread.findOne({ threadId: req.params.threadId })
    .then(thread => {
      thread.views += 1;
      thread.save().then(res.json(thread));
    })
    .catch(err => res.status(404).json({ nothreadfound: "No thread found" }));
});

// @desc    Create new thread
// @route   POST api/:forumSection/
// @access  PRIVATE
router.post(
  "/:forumSection",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.body.forumSection = req.params.forumSection;
    const { errors, isValid } = validateThreadInput(req.body);

    if (!req.user) {
      return res
        .status(401)
        .json({ notauthorized: "You must log in to create a thread" });
    }

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    saveThread = () => {
      // Set random thread identifier
      let threadId = threadIdGenerator(6);
      // Check if it already exists, if yes: reroll it with recursion
      Thread.findOne({ threadId: threadId })
        .then(thread => {
          if (thread) {
            saveThread();
          }

          const newThread = new Thread({
            forumSection: req.params.forumSection,
            user: req.user.id,
            author: req.user.name,
            avatar: req.user.avatar,
            title: req.body.title,
            text: req.body.text,
            threadId: threadId
          });

          newThread
            .save()
            .then(thread => res.json(thread))
            .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
    };
    saveThread();

    // Payout
    Wallet.findOne({ user: req.user.id }).then(wallet => {
      //   // Get all past transactions and sort for this type
      //   if (wallet.transactions !== []) {
      //     const newThreadPayouts = wallet.transactions.filter(
      //       transaction => transaction.from === "Minted - New Thread"
      //     );
      //     // Find the most recent payout
      //     recentPayout = newThreadPayouts => {
      //       let result;
      //       for (payout of newThreadPayouts) {
      //         if (payout.date > result.date) result = payout;
      //       }
      //       return result;
      //     };
      //     // Check recent payout against current time and pay accordingly
      //     if (recentPayout(newThreadPayouts) < Date.now()) {
      //       wallet.transactions.unshift({
      //         ammount: 25,
      //         from: "Minted - New Thread",
      //         to: req.user.name,
      //         note: ""
      //       });
      //     }
      //   } else {
      //     // If no past transactions, payout
      //     wallet.transactions.unshift({
      //       ammount: 26,
      //       from: "Minted - New Thread",
      //       to: req.user.name,
      //       note: "First transaction"
      //     });
      //   }

      wallet.transactions.unshift({
        amount: 50,
        from: "Minted - New Thread",
        to: req.user.name,
        note: "Reward for posting new thread"
      });

      wallet.balance += 50;

      wallet.save();
    });
  }
);

// @desc    Edit thread
// @route   POST api/:forumSection/:threadId/:threadTitle
// @access  PRIVATE
router.put(
  "/:forumSection/:threadId/:threadTitle/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateThreadInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Thread.findOne({ threadId: req.params.threadId }).then(thread => {
      // Check thread owner
      if (thread.user.toString() !== req.user.id) {
        return res.status(401).json({
          notauthorized:
            "User not authorized (you may only edit your own threads)"
        });
      }

      // Edit thread
      (thread.title = req.body.title), (thread.text = req.body.text);

      // Save

      thread
        .save()
        .then(res.json(thread))
        .catch(err => res.status(404).json(err));
    });
  }
);

// @desc    Delete thread
// @route   DELETE api/:forumSection/:threadId/:threadTitle
// @access  PRIVATE
router.delete(
  "/:forumSection/:threadId/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Thread.findOne({ threadId: req.params.threadId })
      .then(thread => {
        // Check thread owner
        if (thread.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorized:
              "User not authorized (you may only delete your own threads)"
          });
        }

        // Delete
        thread.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @desc    Create reply
// @route   POST api/:forumSection/:threadId/:threadTitle/reply
// @access  PRIVATE
router.post(
  "/:forumSection/:threadId/:threadTitle/reply",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateReplyInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Thread.findOne({ threadId: req.params.threadId })
      .then(thread => {
        const newReply = {
          user: req.user.id,
          text: req.body.text,
          author: req.user.name,
          avatar: req.user.avatar
        };

        // Add reply to thread
        thread.replies.push(newReply);

        // Save
        thread
          .save()
          .then(thread => res.json(thread))
          .catch(err =>
            res.status(404).json({ nothreadfound: "No thread found" })
          );
      })
      .catch(err => res.status(404).json({ nothreadfound: "No thread found" }));
  }
);
// @desc    Edit reply
// @route   POST api/:forumSection/:threadId/:threadTitle/:replyId
// @access  PRIVATE
router.put(
  "/:forumSection/:threadId/:threadTitle/:replyId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateReplyInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Thread.findOne({ threadId: req.params.threadId })
      .then(thread => {
        thread.replies.map(reply => {
          if (reply._id.toString() === req.params.replyId) {
            if (reply.user.toString() !== req.user.id) {
              res
                .status(401)
                .json({ notauthorized: "You may only edit your own replies" })
                .catch(err => res.status(404).json(err));
            } else {
              // Edit reply
              reply.text = req.body.text;

              // Save
              thread
                .save()
                .then(thread => res.json(thread))
                .catch(err =>
                  res
                    .status(404)
                    .json({ nothreadfound: "No thread found", err })
                );
            }
          }
        });
      })
      .catch(err =>
        res
          .status(404)
          .json({
            noreplyfound: "No reply found with id " + req.params.replyId
          })
          .catch(err => res.status(404).json(err))
      );
  }
);

// @desc    Delete reply
// @route   DELETE api/:forumSection/:threadId/:threadTitle/:replyId
// @access  PRIVATE
router.delete(
  "/:forumSection/:threadId/:replyId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Thread.findOne({ threadId: req.params.threadId })
      .then(thread => {
        thread.replies.map((reply, index) => {
          if (reply._id.toString() == req.params.replyId) {
            if (reply.user.toString() !== req.user.id) {
              res
                .status(401)
                .json({ notauthorized: "You may only delete your own replies" })
                .catch(err => res.status(404).json(err));
            } else {
              // Delete reply
              thread.replies.splice(index, 1);

              // Save
              thread
                .save()
                .then(thread => res.json(thread))
                .catch(err =>
                  res
                    .status(404)
                    .json({ nothreadfound: "No thread found", err })
                );
            }
          }
        });

        // return res
        //   .status(404)
        //   .json({
        //     noreplyfound: "No reply found with id " + req.params.replyId
        //   })
        //   .catch(err => res.status(404).json(err));
      })
      .catch(err =>
        res
          .status(404)
          .json({
            noreplyfound: "No reply found with id " + req.params.replyId
          })
          .catch(err => res.status(404).json(err))
      );
  }
);

// @desc    Like/unlike thread
// @route   POST api/:forumSection/:threadId/:threadTitle/like
// @access  PRIVATE
router.post(
  "/:forumSection/:threadId/like",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Thread.findOne({ threadId: req.params.threadId })
      .then(thread => {
        if (
          thread.likes.filter(like => like._id.toString() === req.user.id)
            .length > 0
        ) {
          // Remove like if currently liking
          const removeIndex = thread.likes
            .map(like => like._id.toString())
            .indexOf(req.user.id);
          thread.likes.splice(removeIndex, 1);
        } else {
          // Add like to thread
          thread.likes.unshift(req.user);
          // Add to permanent (payable) likes if first time liking
          if (
            thread.likesPermanent.filter(
              item => item._id.toString() === req.user.id
            ).length === 0
          ) {
            thread.likesPermanent.unshift(req.user);
          }
        }
        // Save
        thread
          .save()
          .then(thread => res.json(thread))
          .catch(err =>
            res.status(404).json({ nothreadfound: "No thread found" })
          );
      })
      .catch(err => res.status(404).json({ err }));
  }
);

// @desc    Like/unlike reply
// @route   POST api/:forumSection/:threadId/:replyId/like
// @access  PRIVATE
router.post(
  "/:forumSection/:threadId/:replyId/like",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Thread.findOne({ threadId: req.params.threadId })
      .then(thread => {
        // Check if liked/liking
        let replyIndex;
        thread.replies.map((reply, index) => {
          if (reply._id.toString() === req.params.replyId) {
            replyIndex = index;
          }
        });

        if (replyIndex || replyIndex === 0) {
          if (
            thread.replies[replyIndex].likes.filter(
              item => item._id.toString() === req.user.id
            ).length > 0
          ) {
            // Get remove index of like
            const removeIndex = thread.replies[replyIndex].likes
              .map(item => item._id.toString())
              .indexOf(req.user.id);
            // Remove like
            thread.replies[replyIndex].likes.splice(removeIndex, 1);
          } else {
            // Add to reply likes
            thread.replies[replyIndex].likes.unshift(req.user);
            // Add to permanent (payable) likes if first time liking
            if (
              thread.replies[replyIndex].likesPermanent.filter(
                item => item._id.toString() === req.user.id
              ).length === 0
            ) {
              thread.replies[replyIndex].likesPermanent.unshift(req.user);
            }
          }
          // Save
          thread
            .save()
            .then(thread => res.json(thread))
            .catch(err =>
              res.status(404).json({ nothreadfound: "No thread found" })
            );
        } else {
          res.status(404).json({
            noreplyfound:
              "No reply found with id" + req.params.replyId + " " + replyIndex
          });
        }
      })
      .catch(err => res.status(404).json({ err }));
  }
);

module.exports = router;
