const express = require("express");

const AuthController = require("../controllers/AuthControllers");

module.exports = (app) => {
    const router = express.Router();
    const controller = new AuthController(app);
    router.post("/login", controller.loginAction);
    router.get('/tarefas/find/:codigo', controller.findActionTarefa);
    router.get('/users/find/:codigo', controller.findActionUsuario);
    router.delete('/tarefas/delete/:codigo', controller.deleteActionTarefa);
    router.delete('/users/delete/:codigo', controller.deleteActionUsuario);
    router.post('/tarefas/save', controller.createActionTarefa);
    router.post('/users/save', controller.createActionUsuario);
    router.get('/tarefas/list/:searchQuery?', controller.listActionTarefa);
    router.get('/users/list/:searchQuery?', controller.listActionUsuario);
    return router;
}