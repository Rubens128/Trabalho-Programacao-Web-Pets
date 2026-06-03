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

export {
    listarPets,
};