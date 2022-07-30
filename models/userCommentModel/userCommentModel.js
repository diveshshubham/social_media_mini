// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const userCommentSchema = new Schema({
  contentId: {
    type: Schema.ObjectId,
    ref: 'userContentModel',
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'userModel',
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  comment: {
    type: String,
    default: "nothing"
  },
  commnetedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userCommentModel = db.mongoose.model("userCommentModel", userCommentSchema, "comment");
module.exports = userCommentModel;
