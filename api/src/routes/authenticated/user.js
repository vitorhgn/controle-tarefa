const express = require("express");

const UserController = require("../../controllers/authenticated/UserController");

module.exports = (app) => {
  const router = express.Router();
  const controller = new UserController(app);

  router.get("/find/:codigo", controller.findAction);
  router.delete("/delete/:codigo", controller.deleteAction);
  router.post("/create", controller.createAction);
  router.get("/list/:searchQuery?", controller.listAction);

  return router;
};
