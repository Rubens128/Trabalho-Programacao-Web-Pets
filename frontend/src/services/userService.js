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

        const response = await fetch(`${API_URL}/testeUsuario`, {
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


async function DeletarUsuario(nome) {
    
    try{
        const response = await fetch(`${API_URL}/testeUsuarioDeletar`, {
            method: "DELETE",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nome,
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

async function EditarUsuario(nomeUsuario, novosDados) {
    
    try{
        const response = await fetch(`${API_URL}/testeUsuarioEditar`, {
            method: "PUT",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nomeUsuario,
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
        const response = await fetch(`${API_URL}/testeUsuarioAdicionar`, {
            method: "POST",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuarioDados: usuarioDados
            }),
        })

        const dados = await response.json();

        if(!response.ok){

            console.log("Erro ao adicionar Usuario");

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