const express = require("express");
const router = express.Router();
const { validateApiKey, validateUserToken } = require('../../middleware/index');
const userFriendMapModel = require('../../models/index').userFriendMapModel;
const userModel = require('../../models/index').userModel;
const friendController = require('../../controller/index').friendController

let routes = (app) => {
    //to send request
    router.post("/friend/sendRequest/:friendId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            friendController.sendFriendRequest(req, res, userFriendMapModel)
        }
    );
    //to get sent request and recieved request
    router.get("/friend/friendRequests/:reqType",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            friendController.getFriendRequests(req, res, userFriendMapModel)
        }
    );
    //to accept friend request
    router.put("/friend/requestAction/:requestId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            friendController.friendRequestAction(req, res, userFriendMapModel,userModel)
        }
    );
    //to get friend suggestions
    router.get("/friend/getSuggestion",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            friendController.friendSuggestion(req, res, userModel)
        }
    );
    // to search any user by name
    router.get("/friend/search",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            friendController.friendSearch(req, res, userModel)
        }
    );
     // to get all friends
     router.get("/friend/getFriends",
     validateApiKey,
     validateUserToken,
     (req, res) => {
         friendController.getFriends(req, res, userFriendMapModel)
     }
 );
    //to cancel friend req
    router.put("/friend/cancelRequest/:requestId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            friendController.cancelReq(req, res, userFriendMapModel)
        }
    );
    app.use(router);
};
module.exports = routes;