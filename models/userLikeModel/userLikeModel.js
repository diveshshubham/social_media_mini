// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const userLikeSchema = new Schema({
  contentId: {
    type: Schema.ObjectId,
    ref: 'userContentModel',
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'userModel',
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  likedAt: {
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

const userLikeModel = db.mongoose.model("userLikeModel", userLikeSchema, "like");
module.exports = userLikeModel;
