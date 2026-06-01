require("dotenv").config();

const app = require("./src/app")

app.listen(3001, () => {
    console.log(`Servidor Rodando porta: 3001`)
})