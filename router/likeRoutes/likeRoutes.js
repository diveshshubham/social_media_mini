const express = require("express");
const router = express.Router();
const { validateApiKey, validateUserToken } = require('../../middleware/index');
const likeController = require('../../controller/index').likeController;
const likeModel = require('../../models/index').userLikeModel

let routes = (app) => {
    // add like by user
    router.post("/likes/add/:contentId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            likeController.addLikes(req, res, likeModel)
        }
    );
    //get likes by user by contentId
    router.get("/likes/:contentId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            likeController.getlikes(req, res, likeModel)
        });
    //update like by content Id and by userId
    router.put("/likes/:contentId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            likeController.unlikeController(req, res, likeModel)
        }
    )

    app.use(router);
};
module.exports = routes;