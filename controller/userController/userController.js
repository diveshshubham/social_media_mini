const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
var jwt = require('jsonwebtoken');
var jwtsecret = "indiaisgreat";
const userModel = require('../../models/userModel/userModel');

module.exports = {

    // user login controller
    login: (req, res) => {
        const userMail = req.body.userMail;
        let statusMessage = "bad request";
        if (!userMail) {
            statusMessage = "invalid email";
            res.status(400).send({ msg: statusMessage });
        } else {
            let condition = {
                userMail: userMail
            };
            userModel.findOne(condition)
                .exec((err, userData) => {
                    if (err) {
                        res.status(500).send({ msg: "something went wrong" });
                    } else {
                        if (userData) {
                            createUserToken({ id: userData._id }, function (token) {

                                if (err) {
                                    console.log(err)
                                    res.status(500).send(err);
                                } else {
                                    res.status(200).send({ user: userData, token });
                                }
                            });
                        } else {
                            res.status(400).send({ msg: "invalid cred" });
                        }
                    }
                });
        }
    }
    ,
    //user registration
    register: async (req, res) => {
        try {
            const userName = req.body.userName;
            const userMail = req.body.userMail;
            const about = req.body.about;
            const userLocationX = req.body.userLocationX;
            const userLocationY = req.body.userLocationY;
            const userSuggestionDistance = req.body.userSuggestionDistance;
            const isPrivate = req.body.isPrivate;
            const gender = req.body.gender;

            if (!userName) {
                statusMessage = "name is required";
                res.status(400).send({ msg: statusMessage });
            } else if (!emailExp.test(userMail)) {
                statusMessage = "invalid email";
                res.status(400).send({ msg: statusMessage });
            } else if (!userLocationX || !userLocationY) {
                statusMessage = "empty location";
                res.status(400).send({ msg: statusMessage });
            } else if (!about) {
                statusMessage = "about is required";
                res.status(400).send({ msg: statusMessage });
            } else if (!userLocationX || !userLocationY) {
                statusMessage = "empty location";
                res.status(400).send({ msg: statusMessage });
            }
            let emailCheck = await userModel.findOne({ userMail: userMail })
            if (emailCheck) {
                statusMessage = "email already exists";
                res.status(400).send({ msg: statusMessage });
            }
            let geoLocationObj = {
                coordinates: [userLocationY, userLocationX],
                type: "Point",
            };
            const user = new userModel({
                userName: userName,
                userMail: userMail,
                about: about,
                userLocationX: userLocationX,
                userLocationY: userLocationY,
                geoLocation: geoLocationObj,
                userSuggestionDistance: userSuggestionDistance,
                isPrivate: isPrivate,
                gender: gender
            });
            await user.save()
            res.status(200).send({ user: user })

        } catch (err) {
            console.log(err)
            res.status(500).send({ msg: err })
        }
    },

    //update user
    updateUser: async (req, res) => {
        try {
            const userId = req.user._id;
            const about = req.body.about;
            const userName = req.body.userName;
            const userLocationX = req.body.userLocationX;
            const userLocationY = req.body.userLocationY;
            const userSuggestionDistance = req.body.userSuggestionDistance;
            const isPrivate = req.body.isPrivate;
            const dob = req.body.dob;
            const gender = req.body.gender
            let condition = { _id: userId }
            let geoLocationObj = {
                coordinates: [userLocationY, userLocationX],
                type: "Point",
            };
            if (userId) {
                const updateUser = {
                    userName: userName,
                    userLocationX: userLocationX,
                    userLocationY: userLocationY,
                    geoLocationObj: geoLocationObj,
                    about: about,
                    userSuggestionDistance: userSuggestionDistance,
                    isPrivate: isPrivate,
                    dob: dob,
                    gender: gender
                }
                let updUser = await userModel.updateOne(condition, { $set: updateUser })
                updUser = await userModel.findOne(condition)
                res.status(200).send({ data: updUser })

            } else {
                res.status(403).send({ msg: "forbidden" })
            }
        }
        catch (err) {
            res.status(500).send({ msg: "something went wrong" })
        }

    },

    //upload media
    uploadMedia: async (req, res, mediaModel, contentModel) => {
        try {

            const userId = req.user._id
            const content = req.body.content;
            const contentType = req.body.contentType;
            const locationX = req.body.locationX;
            const locationY = req.body.locationY;
            const isVisibleToAll = req.body.isVisibleToAll;
            //const isVisibleToFriend = req.body.isVisibleToFriend;

            if (userId &&
                content &&
                contentType &&
                locationX &&
                locationY) {

                let geoLocationObj = {
                    coordinates: [locationY, locationX],
                    type: "Point",
                };

                let mediaObj = {
                    userId: userId,
                    content: content,
                    contentType: contentType,
                    locationX: locationX,
                    locationY: locationY,
                    geoLocation: geoLocationObj,
                }

                if (isVisibleToAll == true) {
                    mediaObj.isVisibleToAll = true
                }
                let userMediaObj = new mediaModel(mediaObj)
                userMediaObj = await userMediaObj.save()
                mediaObj.mediaId = userMediaObj._id

                let contentObj = new contentModel(mediaObj)
                await contentObj.save()

                res.status(200).send({ data: userMediaObj })

            } else {
                res.status(400).send({ msg: "wrong body param" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },

    //update media
    updateMedia: async (req, res, mediaModel, contentModel) => {
        try {

            const userId = req.user._id;
            const mediaId = req.params.mediaId;
            const content = req.body.content;
            const contentType = req.body.contentType;
            const locationX = req.body.locationX;
            const locationY = req.body.locationY;
            const isVisibleToAll = req.body.isVisibleToAll;
            const isDeleted = req.body.isDeleted;
            //const isVisibleToFriend = req.body.isVisibleToFriend;
            let conditionMedia = { _id: mediaId }
            let conditionContent = { mediaId: mediaId }

            let userCheck = await mediaModel.findOne(conditionMedia)

            if (userId.toString() != userCheck.userId.toString()) {
                res.status(403).send({ msg: "access denied" })
            }

            if (userId &&
                content &&
                contentType &&
                locationX &&
                locationY) {

                let geoLocationObj = {
                    coordinates: [locationY, locationX],
                    type: "Point",
                };

                let updMediaObj = {
                    userId: userId,
                    content: content,
                    contentType: contentType,
                    locationX: locationX,
                    locationY: locationY,
                    geoLocation: geoLocationObj,
                    updatedAt: new Date()
                }

                if (isVisibleToAll == false) {
                    updMediaObj.isVisibleToAll = false
                }

                if (isDeleted == true) {
                    updMediaObj.isDeleted = true
                }

                await mediaModel.updateOne(conditionMedia, { $set: updMediaObj })
                await contentModel.updateOne(conditionContent, { $set: updMediaObj })

                res.status(200).send({ data: "successfully updated" })
            } else {
                res.status(400).send({ msg: "wrong body param" })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: "server error" })
        }
    },

}

/**
* Used t o create JWT token
* @param {Object} admin
* @param {any} callback
*/
function createUserToken(user, callback) {
    var token = jwt.sign(user, jwtsecret, {
        expiresIn: "365d", // expires in 365 days
    });
    callback(token);
}
