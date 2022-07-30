const mongoose = require("mongoose");
const { Types } = require("mongoose");
module.exports = {
    //user saves content
    addContent: async (req, res, contentModel) => {
        try {
            const userId = req.user._id
            const content = req.body.content;
            const contentType = req.body.contentType;
            const locationX = req.body.locationX;
            const locationY = req.body.locationY;
            const isVisibleToAll = req.body.isVisibleToAll;
            const isVisibleToFriend = req.body.isVisibleToFriend;

            if (userId &&
                content &&
                contentType &&
                locationX &&
                locationY &&
                isVisibleToAll &&
                isVisibleToFriend) {

                let geoLocationObj = {
                    coordinates: [locationY, locationX],
                    type: "Point",
                };

                let userContentObj = new contentModel({
                    userId: userId,
                    content: content,
                    contentType: contentType,
                    locationX: locationX,
                    locationY: locationY,
                    geoLocation: geoLocationObj,
                    isVisibleToAll: isVisibleToAll,
                    isVisibleToFriend: isVisibleToFriend
                })

                userContentObj = await userContentObj.save()
                res.status(200).send({ data: userContentObj })
            } else {
                res.status(400).send({ msg: "wrong body param" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },

    //user edits content
    updateContent: async (req, res, contentModel) => {
        try {
            const userId = req.user._id;
            const contentId = req.params.contentId;
            const content = req.body.content;
            const contentType = req.body.contentType;
            const isVisibleToAll = req.body.isVisibleToAll;
            const isVisibleToFriend = req.body.isVisibleToFriend;
            const isDeleted = req.body.isDeleted;

            if (userId && contentId) {

                let condition = { _id: contentId, userId: userId }

                let updObj = {
                    userId: userId,
                    content: content,
                    contentType: contentType,
                    isVisibleToAll: isVisibleToAll,
                    isVisibleToFriend: isVisibleToFriend,
                    isDeleted: isDeleted,
                    updatedAt: new Date()
                }
                updObj = await contentModel.updateOne(condition, { $set: updObj })
                updObj = await contentModel.findOne(condition)
                res.status(200).send({ data: updObj })
            }
            else {
                res.status(400).send({ msg: "invalid params" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },

    //user gets all his undeleted content
    getContent: async (req, res, contentModel) => {
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
            let contensUser = await contentModel.find({ userId: userId, isDeleted: false })
            let totalCount = contensUser.length

            contensUser = await contentModel.find({ userId: userId })
                .skip(offset)
                .limit(limt)
                .sort({ "updatedAt": -1 })

            res.status(200).send({ data: contensUser, totalCount })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },

    //user gets all content including 
    getAllContent: async (req, res, contentModel, userModel, friendModel) => {
        try {
            const userId = req.user._id;
            const page = req.query.pageIndex;
            const limit = req.query.perPage;
            let userOID = new mongoose.Types.ObjectId(userId)

            var offset = '';
            var limt = '';
            let condition = { _id: userId }

            if (page && limit) {
                offset = (page - 1) * limit;
                offset = parseInt(offset);
                limt = parseInt(limit);
            }
            let userFriendsArray = await userModel.findOne(condition)
            userFriendsArray = userFriendsArray.friends
            userFriendsArray.push(userOID)

            condition = {
                userId: { $in: userFriendsArray },
                isVisibleToFriend: true,
                isDeleted: false
            }
            let populate = {
                path: 'userId',
                select: {
                    userName: 1,
                    gender: 1
                }
            }

            let totalCount = await contentModel
                .find(condition)
            totalCount = totalCount.length

            let content = await contentModel
                .find(condition)
                .skip(offset)
                .limit(limt)
                .sort({ "updatedAt": -1 })
                .populate(populate)

            res.status(200).send({ data: content, totalCount })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    },
    
    //user gets content by id
    getContentbyId: async (req, res, contentModel) => {
        try {
            const contentId = req.params.contentId;
            let condition = { _id: contentId, isDeleted: false }
            let content = await contentModel.findOne(condition)
            res.status(200).send({ data: content })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "something went wrong" })
        }
    }
}