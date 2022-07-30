const express = require("express");
const router = express.Router();
const { validateApiKey, validateUserToken } = require('../../middleware/index');
const contentModel = require('../../models/index').userContentModel;
const userModel = require('../../models/index').userModel;
const userFriendMapModel = require('../../models/index').userFriendMapModel;
const contentController = require('../../controller/index').contentController;

let routes = (app) => {

    // add content by user
    router.post("/content/add",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            contentController.addContent(req, res,contentModel)
        }
    );

    //get user's own contents
    router.get("/content/user",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            contentController.getContent(req, res, contentModel)
        });

     //get user's all contents including friend's content
     router.get("/content/allContent",
     validateApiKey,
     validateUserToken,
     (req, res) => {
         contentController.getAllContent(req, res, contentModel,userModel,userFriendMapModel)
     });

    //get content by user and contentId
    router.get("/content/:contentId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            contentController.getContentbyId(req, res, contentModel)
        });

    //update content by content Id and by userId
    router.put("/content/:contentId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            contentController.updateContent(req, res, contentModel)
        }
    )

    app.use(router);
};
module.exports = routes;