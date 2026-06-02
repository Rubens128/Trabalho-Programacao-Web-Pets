const { auth } = require("../config/firebase");

async function verificarToken(req, res, next) {
    
    try {

        const token = req.headers.token;

        if (!token) {

            return res.status(401).json({

                message: "Token não enviado"
            });
        }

        const usuarioDecodificado = await auth.verifyIdToken(token);

        req.usuario = usuarioDecodificado;

        next();

    } catch(error) {

        return res.status(401).json({

            message: "Token inválido ou expirado."
        });
    }
}

module.exports = verificarToken;