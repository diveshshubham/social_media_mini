// Import mongoose database Connection
const db = require("../../database/mongo/connection");

const Schema = db.mongoose.Schema;

const friendSchema = new Schema({

    userId: {
        type: Schema.ObjectId,
        ref: 'userModel',
    },
    friendId: {
        type: Schema.ObjectId,
        ref: 'userModel',
    },
    requestSentAt: {
        type: Date,
        default: Date.now,
    },
    requestAcceptedAt: {
        type: Date,
        default: Date.now,
    },
    isFriend: {
        type: Boolean,
        default: false,
       // required: true
    },
    isCanceled: {
        type: Boolean,
        default: false,
       // required: true
    },
    isRejectd: {
        type: Boolean,
        default: false,
       // required: true
    },
    isBlocked: {
        type: Boolean,
        default: false,
       // required: true
    },
    blockTime: {
        type: Date
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

const friendModel = db.mongoose.model("friendModel", friendSchema, "friend");
module.exports = friendModel;
