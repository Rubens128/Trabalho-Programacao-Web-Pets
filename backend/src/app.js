const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes.js")

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        message: "Teste de API",
    })
})

app.use("/auth", authRoutes)

module.exports = app;