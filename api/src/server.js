const express = require("express");
const cors = require("cors");
const knex = require("knex");

const knexfile = require("../knexfile");
const AuthRoutes = require("./routes/auth");
const TarefasRoutes = require("./routes/authenticated/tarefas");
const UserRoutes = require("./routes/authenticated/user");
const UserTaskRoutes = require("./routes/authenticated/userTask");

const app = express();
app.db = knex(knexfile.test);
app.use(cors());
app.use(express.json());

app.use("/auth", AuthRoutes(app));
app.use("/admin/tarefa", TarefasRoutes(app));
app.use("/admin/user", UserRoutes(app));
app.use("/admin/user-task", UserTaskRoutes(app));

app.listen(3009);