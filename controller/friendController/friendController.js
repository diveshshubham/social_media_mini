
const mongoose = require("mongoose");
const { Types } = require("mongoose");
module.exports = {
    //send friend req by user
    sendFriendRequest: async (req, res, friendModel) => {
        try {
            const userId = req.user._id
            const friendId = req.params.friendId;
            const requestSentAt = new Date();

            let checkCondition = {
                userId: userId,
                friendId: friendId,
                isFriend: false,
                isBlocked: false,
                isRejectd: false,
                isCanceled: false
            }

            let reqCheck = await friendModel.findOne(checkCondition)

            if (reqCheck) {
                checkCondition = {
                    userId: userId,
                    friendId: friendId,
                    isFriend: true,
                }
                reqCheck = await friendModel.findOne(checkCondition)
                if (reqCheck) {
                    res.status(400).send({ data: "already a friend" })
                } else {
                    res.status(400).send({ data: "request alrady sent" })
                }
            }
            else if (userId &&
                friendId &&
                requestSentAt) {

                let freindReqModel = new friendModel({
                    userId: userId,
                    friendId: friendId,
                    requestSentAt: requestSentAt
                })
                let friendReqSave = await freindReqModel.save()

                res.status(200).send({ data: friendReqSave })
            } else {
                res.status(400).send({ data: "invaild body param" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },

    //get friend request
    getFriendRequests: async (req, res, friendModel) => {
        try {
            const userId = req.user._id;
            const page = req.query.pageIndex;
            const limit = req.query.perPage;
            const reqType = req.params.reqType

            var offset = '';
            var limt = '';

            if (page && limit) {
                offset = (page - 1) * limit;
                offset = parseInt(offset);
                limt = parseInt(limit);
            }

            let condition = {}
            let populate = {}
            if (reqType == 'recievedRequest') {
                condition = {
                    friendId: userId,
                    isFriend: false,
                    isRejectd: false,
                    isCanceled: false
                };
                populate = {
                    path: 'userId',
                    select: {
                        userName: 1,
                        gender: 1
                    }
                }
            }
            if (reqType == 'sentRequest') {
                condition = {
                    userId: userId,
                    isFriend: false,
                    isRejectd: false,
                    isCanceled: false
                };
                populate = {
                    path: 'friendId',
                    select: {
                        userName: 1,
                        gender: 1
                    }
                }
            }

            let getFriendReq = await friendModel.find(condition)
            let totalCount = getFriendReq.length
            getFriendReq = await friendModel.find(condition)
                .skip(offset)
                .limit(limt)
                .sort({ "createdAt": -1 })
                .populate(populate)

            res.status(200).send({ data: getFriendReq, totalCount })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },

    //accept or reject friend request
    friendRequestAction: async (req, res, friendModel, userModel) => {
        try {
            const userId = req.user._id;
            const requestId = req.params.requestId;
            const requestAcceptedAt = new Date();
            const isFriend = req.body.isFriend;
            const isRejectd = req.body.isRejectd;
            let updReqObj = {}
            let condition = { _id: requestId }
            let requestCheck = await friendModel.findOne(condition)

            if ((isFriend == true && isRejectd == true) ||
                (isFriend == false && isRejectd == false)) {
                res.status(400).send({ msg: "invalidCondition" })
            }
            else if (requestCheck.isRejectd == true) {
                res.status(400).send({ masg: "already rejected" })
            }
            else if (requestCheck.isFriend == true) {
                res.status(400).send({ masg: "already accepted" })
            }
            else if (isFriend == true && isRejectd == false) {

                let friendId = requestCheck.userId

                let friendOID = new mongoose.Types.ObjectId(friendId)
                let userOID = new mongoose.Types.ObjectId(userId)

                updReqObj = {
                    requestAcceptedAt: requestAcceptedAt,
                    isFriend: true,
                    isRejectd: false,
                    updatedAt: new Date()
                }
                await friendModel.updateOne(condition, { $set: updReqObj })

                condition = { _id: userId }
                updReqObj = {
                    $push: {
                        friends:
                            friendOID
                    }
                }
                await userModel.updateOne(condition, updReqObj)

                condition = { _id: friendId }
                updReqObj = {
                    $push: {
                        friends:
                            userOID
                    }
                }
                await userModel.updateOne(condition, updReqObj)

                res.status(200).send({ data: "action executed sucessfully" })
            }
            else if (isRejectd == true && isFriend == false) {
                updReqObj = {
                    isFriend: false,
                    isRejectd: true,
                    updatedAt: new Date()
                }
                await friendModel.updateOne(condition, { $set: updReqObj })
                res.status(200).send({ data: "action executed sucessfully" })
            } else {
                res.status(500).send({ msg: "something went wrong" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },

    //getuser friend suggestion
    friendSuggestion: async (req, res, userModel) => {
        try {
            const userId = req.user._id;
            const page = req.query.pageIndex;
            const limit = req.query.perPage;

            var offset = '';
            var limt = '';
            if (page && limit) {
                offset = (page - 1) * limit;
                offset = parseInt(offset);
                limt = parseInt(limit);
            }

            let condition = { _id: userId }

            if (userId) {
                let userSugg = await userModel.findOne(condition)
                let userLocationX = userSugg.userLocationX;
                let userLocationY = userSugg.userLocationY;
                let userSuggestionDistance = userSugg.userSuggestionDistance;
                condition = {
                    geoLocation: {
                        $geoWithin: {
                            $centerSphere: [[userLocationY, userLocationX],
                            getLocationRange(userSuggestionDistance)],
                        },
                    },
                    isPrivate: false,
                    _id: { $ne: userId }
                };
                userSugg = await userModel.find(condition)
                let totalCount = userSugg.length

                userSugg = await userModel
                    .find(condition)
                    .skip(offset)
                    .limit(limt)
                    .sort({ "updatedAt": -1 })

                res.status(200).send({ data: userSugg, totalCount })
            } else {
                res.status(400).send({ msg: "invalid req param" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },
    //simple user search
    friendSearch: async (req, res, userModel) => {
        try {
            const searchParam = req.query.searchParam;
            const page = req.query.pageIndex;
            const limit = req.query.perPage;

            var offset = '';
            var limt = '';

            if (page && limit) {
                offset = (page - 1) * limit;
                offset = parseInt(offset);
                limt = parseInt(limit);
            }

            let condition = {
                userName: { $regex: ".*" + searchParam + ".*", $options: "i" },
                isPrivate: false
            };

            let userSearched = await userModel.find(condition)
            let totalCount = userSearched.length

            userSearched = await userModel.find(condition)
                .skip(offset)
                .limit(limt)
                .sort({ "userName": 1 })

            res.status(200).send({ data: userSearched, totalCount })
        }
        catch (err) {
            res.status(500).send({ msg: "server error" })
        }
    },
    //cancel freind req
    cancelReq: async (req, res, friendModel) => {
        try {
            const requestId = req.params.requestId;

            let condition = { _id: requestId }
            let requestCheck = await friendModel.findOne(condition)

            if (requestCheck.isCanceled == true) {
                res.status(400).send({ msg: "already canceled" })
            } else {
                let updCancelObj = {
                    isCanceled: true,
                    updatedAt: new Date()
                }
                requestCheck = await friendModel.updateOne(condition, { $set: updCancelObj })
                res.status(200).send({ msg: "successfully canceled" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },

    //get friends 
    getFriends: async (req, res, friendModel) => {
        try {
            const userId = req.user._id;
            const page = req.query.pageIndex;
            const limit = req.query.perPage;

            var offset = '';
            var limt = '';

            if (page && limit) {
                offset = (page - 1) * limit;
                offset = parseInt(offset);
                limt = parseInt(limit);
            }

            let conditionUser = {
                userId: userId,
                isFriend: true,
                isRejectd: false,
                isCanceled: false
            };
            let conditionFriend = {
                friendId: userId,
                isFriend: true,
                isRejectd: false,
                isCanceled: false
            };
            let populateUser = {
                path: 'friendId',
                select: {
                    userName: 1,
                    gender: 1,
                    about: 1,
                    geoLocation: 1,
                }
            }
            let populateFriend = {
                path: 'userId',
                select: {
                    userName: 1,
                    gender: 1,
                    about: 1,
                    geoLocation: 1,
                }
            }

            let getFriends = await friendModel.find({ $or: [{ userId: userId }, { friendId: userId }] })
            let totalCount = getFriends.length

            getFriends = await friendModel.find(conditionUser)
                .skip(offset)
                .limit(limt)
                .sort({ "createdAt": -1 })
                .populate(populateUser)

            let getFriendsbyFriendsId = await friendModel.find(conditionFriend)
                .skip(offset)
                .limit(limt)
                .sort({ "createdAt": -1 })
                .populate(populateFriend)

            getFriends = getFriends.concat(getFriendsbyFriendsId)

            res.status(200).send({ data: getFriends, totalCount })
        }
        catch (err) {
            res.status(500).send({ msg: "server error" })
        }
    },
}
function getLocationRange(distanceRange) {
    var earthRadiusInMiles = 3959;
    return distanceRange / earthRadiusInMiles;
}