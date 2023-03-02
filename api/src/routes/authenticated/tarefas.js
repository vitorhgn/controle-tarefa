const express = require("express");

const TarefasController = require("../../controllers/authenticated/TarefasController");

module.exports = (app) => {
  const router = express.Router();
  const controller = new TarefasController(app);

  router.get("/find/:codigo", controller.findAction);
  router.delete("/delete/:codigo", controller.deleteAction);
  router.post("/create", controller.createAction);
  router.get("/list/:searchQuery?", controller.listAction);

  return router;
};
