// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const contentSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'userModel',
    },
    mediaId: {
        type: Schema.ObjectId,
        ref: 'media',
    },
    content: {
        type: String,
        default: 'nothing',
    },
    contentType: {
        type: String,
        default: 'nothing',
    },
    locationX: {
        type: Number,  
       // required: true, 
    },
    locationY: {
        type: Number,  
       // required: true,     
    },
    geoLocation: {
        type: {
          type: String,
          enum: ["Point"],
        //  required: true,
        },
        coordinates: {
          type: [Number],
         // required: true,
        },
      },
    isVisibleToAll:{
        type:Boolean,
        default:true
    },
    isVisibleToFriend:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
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

const contentModel = db.mongoose.model("contentModel", contentSchema, "content");
module.exports = contentModel;
