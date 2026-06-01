const authService = require("../service/authService");

async function login(req, res){

    try{

        const { email, senha } = req.body;

        if (!email || !senha){

            return res.status(400).json({
                message: "Email e senha são obrigatórios",

            });
        }

        const resultado = await authService.login(email, senha);

        return res.status(200).json({
            message: "Login realizado com sucesso.",
            usuario: resultado.usuario,
            token: resultado.token,
            refreshToken: resultado.refreshToken
        });

    } catch(error){

        console.error("Erro no login", error.message);

        return res.status(401).json({

            message: "Email ou senha inválidos.",
            error: error.message
        });
    }
}

module.exports = {
    login
};