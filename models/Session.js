const mongoose = require("mongoose");

//Create Schema
const SessionSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  invitedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  highlightedQueries: [
    {
      title: {
        type: String,
        required: true
      },
      snippet: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      },
      user: {
        type: String
      },
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }
        }
      ],
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
          content: {
            type: String,
            required: true
          },
          userName: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Session = mongoose.model("Session", SessionSchema);
