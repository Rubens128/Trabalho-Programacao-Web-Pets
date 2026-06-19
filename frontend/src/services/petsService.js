const API_URL = "http://localHost:3001";

async function listarPets(filtros){

    const filtrosPadrao = {
        recentes: false,
        limit: 100,
        idadeMin: 0,
        idadeMax: 1000,
        petId: null,
        pesquisa: "",
        usuario:{
            userId: null,
            verificarAdotados: false,
            verificarAdicionados: false,
        },
        filtroEspecie: {
            todos: true,
            repteis: false,
            mamiferos: false,
            aves: false,
            anfibios: false,
            peixes: false,
            invertebrados: false
        },
        filtroPorte: {
            todos: true,
            pequeno: false,
            medio: false,
            grande: false
        }
    }

    const filtrosFinal = {
        ...filtrosPadrao,
        ...filtros
    }

    const parametros = new URLSearchParams();

    parametros.append("filtros", JSON.stringify(filtrosFinal));

    const response = await fetch(`${API_URL}/pets/listarPets?${parametros}`, {
        method: "GET",
        headers:  {
            "Content-Type": "application/json",
        },
    })

    const dados = await response.json();

    if(!response.ok){

        console.log("Erro ao listar Pets");
        return null;
    }
    
   return dados;
}

async function editarPet(petId, novosDados) {
    
    if(novosDados.dataNasc) {

        const [ dia, mes, ano ] = novosDados.dataNasc.split(/[\/\-., ]+/);

        const data = new Date(`${ano}-${mes}-${dia}`);

        if(isNaN(data.getTime())) return {erro: "Data de nascimento inválida"};

        novosDados.dataNasc = data;
    }

    try{
        const response = await fetch(`${API_URL}/pets/editarPet`, {
            method: "PUT",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                petId: petId,
                novosDados: novosDados,
            }),
        })

        const dados = await response.json();

        if(!response.ok){

            console.log("Erro ao editar Pet");

            return null;
        }

        return dados;

    } catch (error){

        console.log("Erro ao editar pet:", error);

        return null;
    }
    
}

async function deletarPet(petId) {
    
    try{
        const response = await fetch(`${API_URL}/pets/deletarPet`, {
            method: "DELETE",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                petId: petId,
            }),
        })

        const dados = await response.json();

        if(!response.ok){

            console.log("Erro ao deletar Pet");

            return null;
        }

        return dados;

    } catch (error){

        console.log("Erro ao deletar pet:", error);

        return null;
    }
    
}

async function AdicionarPet(dadosPet){

    const resposta = {
        erros: {},
        dadosPet: dadosPet,
        erroBackEnd: false,
        mensageError: "",
        dados: null,
    }

    Object.keys(dadosPet).forEach((key, index) => {

        if (index > 9) return;

        if (!dadosPet[key]) resposta.erros[key] = true;
    })

    if(Object.keys(resposta.erros).length > 0) return resposta;

    const [ dia, mes, ano ] = dadosPet.dataNasc.split(/[\/\-., ]+/);

    const data = new Date(ano, mes, dia);

    if(isNaN(data.getTime())) resposta.erros["dataNasc"] = true;

    dadosPet.dataNasc = data;

    const altura = dadosPet.altura.replace("," , ".");

    if(isNaN(Number(altura))) resposta.erros["altura"] = true;

    if(Object.keys(resposta.erros).length > 0) return resposta;

    try{
        const responseBackEnd = await fetch(`${API_URL}/pets/adicionarPet`, {
            method: "POST",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dadosPet: dadosPet
            }),
        })

        const dados = await responseBackEnd.json();

        if(!responseBackEnd.ok){

            console.log("Erro ao adicionar Pet");

            resposta.erroBackEnd = true;
            resposta.mensageError = "Erro ao adicionar Pet"

            return resposta;
        }

        resposta.dados = dados;

        return resposta;

    } catch (error){

        console.log("Erro ao adicionar pet:", error);

        resposta.erroBackEnd = true;
        resposta.mensageError = "Erro ao adicionar Pet";

        return resposta;
    }

}

export {
    listarPets,
    editarPet,
    deletarPet,
    AdicionarPet,
};