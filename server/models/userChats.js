const mongoose = require('mongoose');

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    chats: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,   
          required: true,
          ref: "chat",
        },
        title: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default:Date.now()
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.UserChats || mongoose.model("UserChats", userChatsSchema);