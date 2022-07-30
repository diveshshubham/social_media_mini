const express = require("express");
const router = express.Router();
const { validateApiKey, validateUserToken } = require('../../middleware/index');
const commentModel = require('../../models/index').userCommentModel;
const contentModel = require('../../models/index').userContentModel;
const commentController = require('../../controller/index').commentController;

let routes = (app) => {

    // add comment by user
    router.post("/comment/add/:contentId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            commentController.addComment(req, res, commentModel, contentModel)
        }
    );

    //get comments by user by contentId
    router.get("/comment/:contentId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            commentController.getComments(req, res, commentModel)
        });

    //update edit comment by comment Id and by userId
    router.put("/comment/:commentId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            commentController.updateComment(req, res, commentModel, contentModel)
        }
    )
    app.use(router);
};
module.exports = routes;