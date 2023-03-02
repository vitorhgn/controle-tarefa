const express = require("express");

const AuthController = require("../controllers/AuthControllers");

module.exports = (app) => {
    const router = express.Router();
    const controller = new AuthController(app);
    router.post("/login", controller.loginAction);
    
    return router;
}