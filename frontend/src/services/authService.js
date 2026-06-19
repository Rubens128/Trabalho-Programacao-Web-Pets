import Usuario from "../models/usuario";

const API_URL = "http://localhost:3001";

async function loginUsuario(email, senha) {

    try {
        const response = await fetch(`${API_URL}/auth/login`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                email,
                senha
            }),
        });

        const data = await response.json();

        if (!response.ok) {

            console.log()
            return null;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        return { sucesso: true, usuario: data.usuario };
    } catch (error) {

        console.log("Erro ao fazer login:", error);
        return null;
    }

}

async function RegistrarUsuario(email, senha, nome) {

    try {

        const erros = {
            email: false,
            nome: false,
            senha: false,
            mensagem: "",
            uid: null,
        };

        const responseUsuarioAuth = await fetch(`${API_URL}/auth/registrarUsuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
            }),
        });

        const usuarioAuth = await responseUsuarioAuth.json();

        if (!responseUsuarioAuth.ok) {

            if (usuarioAuth?.error) {

                erros.email = true;
                erros.mensagem = "Email já está em uso.";

                return erros;
            }

            return null;
        }

        erros.uid = usuarioAuth.uid;

        return erros;

    } catch (error) {

        console.log("Erro ao adicionar Usuario no authentication", error);
        return null;
    }
}

export { loginUsuario, RegistrarUsuario };