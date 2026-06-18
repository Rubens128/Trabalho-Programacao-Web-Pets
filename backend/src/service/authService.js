import { auth } from "../config/firebase.js";

async function login(email, senha){

    const apiKey = process.env.FIREBASE_API_KEY;

    if (!apiKey){

        throw new Error("A Firebase Key não foi encotrada no sistema!!");
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

    const response = await fetch(
         url ,
         {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: senha,
                returnSecureToken: true, 
            }),
         }
    );

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.error?.message || "Erro ao fazer login");
    }

    return {
        usuario: {
            uid: data.localId,
            email: data.email,
        },
        token: data.idToken,
        refreshToken: data.refreshToken,
    };
}

async function registrarUsuarioService(usuario) {


  try {

    await auth.getUserByEmail(usuario.email);

    return {
        error: true,
        message: "email já está em uso."
    }

  } catch (error) {

    if (error.code !== "auth/user-not-found") {
        
        console.log(error);
    }
  }

  try {
    const usuarioCriado = await auth.createUser({
      email: usuario.email,
      password: usuario.senha,
      displayName: usuario.nome
    });

    return {
      uid: usuarioCriado.uid,
      email: usuarioCriado.email,
      nome: usuario.nome,
    };

  } catch (error) {

    console.log("Erro ao criar usuário:", error);

    throw new Error(error.message || "Erro ao criar usuário");
  }
}

export default { login, registrarUsuarioService };