const express = require("express");
const router = express.Router();
const { validateApiKey, validateUserToken } = require('../../middleware/index');
const userController = require('../../controller/index').userController;
const contentModel = require('../../models/index').userContentModel;
const mediaModel = require('../../models/index').userMediaModel;

let routes = (app) => {
    //to register user
    router.post("/user/register",
        validateApiKey,
        (req, res) => {
            userController.register(req, res)
        }
    );
    //to login user
    router.post("/user/login",
        validateApiKey,
        (req, res) => {
            userController.login(req, res)
        }
    );
    //user updoad user's personal media
    router.post("/user/uploadMedia",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            userController.uploadMedia(req, res, mediaModel, contentModel)
        }
    );
    //user udates media
    router.put("/user/updateMedia/:mediaId",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            userController.updateMedia(req, res, mediaModel, contentModel)
        }
    );
    // user to update his own profile
    router.put("/user/updateProfile",
        validateApiKey,
        validateUserToken,
        (req, res) => {
            userController.updateUser(req, res)
        }
    )
    app.use(router);
};
module.exports = routes;