// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userMail: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "HUMAN"
  },
  about: {
    type: String,
    required: true,
  },
  userLocationX: {
    type: Number,
    required: true,
  },
  userLocationY: {
    type: Number,
    required: true,
  },
  geoLocation: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  userSuggestionDistance: {
    type: Number,
    default: 3
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  dob: {
    type: Date,
    default: Date.now,
  },
  friends: [{
    type: Schema.ObjectId,
  }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = db.mongoose.model("userModel", userSchema, "user");
module.exports = userModel;
