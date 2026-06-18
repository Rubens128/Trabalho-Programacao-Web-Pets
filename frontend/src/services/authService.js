import Usuario from "../models/usuario";

const API_URL = "http://localhost:3001";

async function loginUsuario(email, senha){

    const response = await fetch(`${API_URL}/auth/login`, {

        method: "POST",
        headers:  {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            email,
            senha
        }),
    });

    const data = await response.json();

    if(!response.ok) {
        
        console.log()
        return null;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    return {sucesso: true, usuario: data.usuario};
}


async function verificarUsuarioLogado() {
    
    const token = localStorage.getItem("token");

    if(!token) {

        return null;
    }

    try{

        const response = await fetch("http://localhost:3001/auth/retornoUsuario", {

            method: "GET",
            headers: {
                token: token
            }
        })

        if(!response.ok){

            localStorage.removeItem("token");
            localStorage.removeItem("usuario");

            return null;
        }

        const data = await response.json();

        return data.usuario;

    } catch(error){

        console.log(error);

        return null;
    }
    
}

export { loginUsuario, verificarUsuarioLogado };