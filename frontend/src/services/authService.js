const API_URL = "http://localhost:3001";

export async function loginUsuario(email, senha){

    const response = await fetch(`${API_URL}/auth/login`, {

        method: "POST",
        headers:  {
            "Content-Type": "applpication/json",
        },

        body: JSON.stringify({
            email,
            senha
        }),
    });

    const data = await response.json();

    if(!response.ok) {
        
        throw new Error(data.message || "Erro ao fazer login");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    return data;
}