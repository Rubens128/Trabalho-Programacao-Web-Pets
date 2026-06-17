const API_URL = "http://localHost:3001";

async function listarPets(filtros){

    const filtrosPadrao = {
        recentes: false,
        limit: 50,
        idadeMin: 0,
        idadeMax: 1000,
        petId: null,
        usuario:{
            userId: null,
            verificarAdotados: false,
            verificarAdicionados: false,
        },
        filtroEspecie: {
            Todos: true,
            Repteis: false,
            mamiferos: false,
            aves: false,
            anfibios: false,
            peixes: false,
            invertebrados: false
        },
        filtroPorte: {
            Todos: true,
            Pequeno: false,
            Medio: false,
            Grande: false
        }
    }

    const filtrosFinal = {
        ...filtrosPadrao,
        ...filtros
    }

    const response = await fetch(`${API_URL}/testeTeste`, {
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

    // temp

    if(filtrosFinal.petId){
            
        const pet = dados.find((pet) => pet.id === filtros.petId);

        return pet;
    } 

   return dados;
}

async function editarPet(idPet, novosDados) {
    
    try{
        const response = await fetch(`${API_URL}/testePetsEditar`, {
            method: "PUT",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                novosDados
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

async function deletarPet(idPet) {
    
    try{
        const response = await fetch(`${API_URL}/testePetsDeletar`, {
            method: "DELETE",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idPet
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

        if (index > 7) return;

        if (!dadosPet[key]) resposta.erros[key] = true;
    })

    if(Object.keys(resposta.erros).length > 0) return resposta;

    const [ dia, mes, ano ] = dadosPet.dataNascimento.split(/[\/\-., ]+/);

    const data = new Date(ano, mes, dia);

    if(isNaN(data.getTime())) resposta.erros["dataNascimento"] = true;

    const peso = dadosPet.peso.replace("," , ".");
    const altura = dadosPet.altura.replace("," , ".");

    if(isNaN(Number(peso))) resposta.erros["peso"] = true;

    if(isNaN(Number(altura))) resposta.erros["altura"] = true;

    if(Object.keys(resposta.erros).length > 0) return resposta;

    try{
        const responseBackEnd = await fetch(`${API_URL}/testePetsAdicionar`, {
            method: "POST",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dadosPet
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