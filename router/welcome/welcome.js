const express = require("express");
const router = express.Router();

let routes = (app) => {
  router.get("/", (req,res) => {
    res.send("👋 welcome to mini social media")
  });
  app.use(router);
};
module.exports = routes;