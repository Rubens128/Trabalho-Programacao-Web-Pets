import Pet from "../models/pet";

const API_URL = "http://localHost:3001";

async function listarPets(filtros){

    const filtrosPadrao = {
        recentes: false,
        limit: 50,
        idadeMin: 0,
        idadeMax: 1000,
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
    };

    const response = await fetch(`${API_URL}/testePets`, {
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

export {
    listarPets,
    editarPet,
    deletarPet,
};