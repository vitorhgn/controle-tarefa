const express = require("express");
const cors = require("cors");
const knex = require("knex");

const knexfile = require("../knexfile");
const AuthRoutes = require("./routes/auth");

const app = express();
app.db = knex(knexfile.test);
app.use(cors());
app.use(express.json());

app.use("/auth", AuthRoutes(app));

app.listen(3009);