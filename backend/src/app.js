const teste = require("./service/usuarioService.js")
const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes.js");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const petsRoutes = require("./routes/petsRoutes.js");
const pedidosAdocaoRoutes = require("./routes/pedidosAdocao.js");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/pets", petsRoutes);
app.use("/pedidosAdocao", pedidosAdocaoRoutes);

module.exports = app;