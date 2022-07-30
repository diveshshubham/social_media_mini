// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const userMediaSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'userModel',
  },
  content:{
    type:String,
    default:"nothing"
  },
  contentType : {
    type:String,
    default:"nothing"
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isVisibleToAll:{
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: "nothing"
  },
  locationX: {
    type: Number,
    //required: true,
  },
  locationY: {
    type: Number,
   // required: true,
  },
  geoLocation: {
    type: {
      type: String,
      enum: ["Point"],
     // required: true,
    },
    coordinates: {
      type: [Number],
     // required: true,
    },
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

const userMediaModel = db.mongoose.model("userMediaModel", userMediaSchema, "media");
module.exports = userMediaModel;
