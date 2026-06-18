const API_URL = "http://localHost:3001";

async function ListarUsuarios(filtros){

    try{

        const filtrosPadrao = {
            userId: null,
            pesquisa: "",
            limit: 50,
        }

        const filtrosFinal = {
            ...filtrosPadrao,
            ...filtros
        };

        const parametros = new URLSearchParams();

        parametros.append("filtros", JSON.stringify(filtrosFinal));

        const response = await fetch(`${API_URL}/usuario/listarUsuarios?${parametros}`, {
            method: "GET",
            headers:  {
                "Content-Type": "application/json",
            },
        })

        const dados = await response.json();

        if(!response.ok){

            console.log("Erro ao listar Usuarios");
            return [];
        }

        return dados;

    } catch (error){

        console.log("Erro ao acessar rota do backend: ", error);

        return [];
    }
}


async function DeletarUsuario(userId) {
    
    try{
        const response = await fetch(`${API_URL}/usuario/deletarUsuario`, {
            method: "DELETE",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            }),
        })

        const dados = await response.json();

        if(!response.ok){

            console.log("Erro ao deletar Usuario");

            return null;
        }

        return dados;

    } catch (error){

        console.log("Erro ao deletar Usuario:", error);

        return null;
    }
    
}

async function EditarUsuario(userId, novosDados) {
    
    try{
        const response = await fetch(`${API_URL}/usuario/editarUsuario`, {
            method: "PUT",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                novosDados: novosDados,
            }),
        })

        const dados = await response.json();

        if(!response.ok){

            console.log("Erro ao editar Usuario");

            return null;
        }

        return dados;

    } catch (error){

        console.log("Erro ao editar Usuario:", error);

        return null;
    }
    
}

async function AdicionarUsuario(usuarioDados) {
    
    const erros = {
        email: false,
        nome: false,
        senha: false,
        mensagem: "",
    }

    if (usuarioDados.email === "" || usuarioDados.email === null) erros.email = true;

    if (usuarioDados.nome === "" || usuarioDados.nome === null) erros.nome = true;

    if (usuarioDados.senha === "" || usuarioDados.senha === null) erros.senha = true;

    if (!Object.keys(erros).every((key) => !erros[key])) {

        erros.mensagem = "Preencha todos os campos"

        return erros;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(usuarioDados.email)){

        erros.email = true;
        erros.mensagem = "Digite um email válido."

        return erros;
    }

    if(usuarioDados.senha.length < 8){

        erros.senha = true;
        erros.mensagem = "A senha deve ter pelo menos 8 caracteres";

        return erros;
    }

    if(!usuarioDados.senha.split("").some((caractere) => caractere >= "A" && caractere <= "Z")){

        erros.senha = true;
        erros.mensagem = "A senha deve ter pelo menos 1 caractere maiúsculo";

        return erros;
    }

    if(!usuarioDados.senha.split("").some((caractere) => caractere >= "a" && caractere <= "z")){

        erros.senha = true;
        erros.mensagem = "A senha deve ter pelo menos 1 caractere minúsculo";

        return erros;
    }

    if(!usuarioDados.senha.split("").some((caractere) => caractere >= "0" && caractere <= "9")){

        erros.senha = true;
        erros.mensagem = "A senha deve ter pelo menos 1 número";

        return erros;
    }

    const caracteresEspeciais = "@$!%*?&+-=";

    if(!usuarioDados.senha.split("").some((caractere) => caracteresEspeciais.includes(caractere))){

        erros.senha = true;
        erros.mensagem = "A senha deve ter pelo menos 1 caractere especial";

        return erros;
    }

    if(usuarioDados.senha !== usuarioDados.confirmarSenha){

        erros.senha = true;
        erros.mensagem = "As senhas não coincidem";

        return erros;
    }

    try{
        const responseUsuarioAuth = await fetch(`${API_URL}/auth/registrarUsuario`, {
            method: "POST",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: usuarioDados.nome,
                email: usuarioDados.email,
                senha: usuarioDados.senha,
            }),
        })

        const usuarioAuth = await responseUsuarioAuth.json();

        if(!responseUsuarioAuth.ok){

            if(usuarioAuth?.error){
                
                erros.email = true;
                erros.mensagem = "Email já está em uso.";

                return erros;
            }

            return null;
        }

        const responseUsuario = await fetch(`${API_URL}/usuario/adicionarUsuario`, {
            method: "POST",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: usuarioDados.nome,
                email: usuarioDados.email,
                uid: usuarioAuth.uid,
            }),
        })
        
        const usuario = await responseUsuario.json();

        if(!responseUsuario.ok){

            console.log("Erro ao adicionar Usuario no banco de dados");

            return null;
        }

        return erros;

    } catch (error){

        console.log("Erro ao adicionar Usuario:", error);

        return null;
    }
}

export {
    ListarUsuarios,
    DeletarUsuario,
    EditarUsuario,
    AdicionarUsuario
}