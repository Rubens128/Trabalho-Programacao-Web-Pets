import { auth } from "../config/firebase.js";
import authService from "../service/authService.js";

export async function login(req, res){

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

export async function registrarUsuarioController(req, res) {

    const { nome, email, senha } = req.body;

    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

    if (!nome || nome === "null") {
        
        return res.status(400).json({

            message: "Nome inválido"
        });
    }       

    if (!email || !email.includes("@")) {
    
        return res.status(400).json({

            message: "Email inválido"
        });
    }

    if (!senha || !senhaRegex.test(senha)) {

        return res.status(400).json({

            message: "A senha deve ter entre 8 e 16 caracteres, com letra maiúscula, minúscula, número e caractere especial."
        });
    }

    try{

        const usuario = await authService.registrarUsuarioService({

            nome: nome,
            email: email,
            senha: senha
        });

        if (Object.keys(usuario).includes("error") === true) {

            return res.status(400).json(usuario);
        }

        return res.status(200).json(usuario);

    }catch(error){
        
        return res.status(500).json({
            message: error
        })
    }
}