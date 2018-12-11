const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  author: {
    type: String,
    default: "user"
  },
  avatar: {
    type: String,
    default: ""
  },
  forumSection: {
    type: String,
    required: true
  },
  threadId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  stickied: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 1
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  likesPermanent: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  replies: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      author: {
        type: String,
        default: "user"
      },
      avatar: {
        type: String,
        default: ""
      },
      text: {
        type: String,
        required: true
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ],
      likesPermanent: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ],
      dateCreated: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

module.exports = Thread = mongoose.model("threads", ThreadSchema);
