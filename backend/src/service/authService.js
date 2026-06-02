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

module.exports = {
    login,
};