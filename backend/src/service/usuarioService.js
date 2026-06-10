import { db } from "../config/firebase.js";

export async function InserirUsuarioDb (usuarioDict){

    try{
        await db.collection("usuarios").doc(usuarioDict.uid).set({

            uid: usuarioDict.uid,
            nome: usuarioDict.nome,
            email: usuarioDict.email,
            tipo: "usuario",
            criadoEm: new Date(),
            fotoPerfilUrl: "",
            endereco: {
                cidade: "",
                cep: "",
                estado: "",
                rua: "",
                complemento: "",
                numero: "",
                referencia: "",
                bairro: ""
            }
        });

        const dicionario = {

            uid: usuarioDict.uid,
            nome: usuarioDict.nome,
            email: usuarioDict.email,
            tipo: "usuario",
            criadoEm: new Date(),
            fotoPerfilUrl: "",
            endereco: {
                cidade: "",
                cep: "",
                estado: "",
                rua: "",
                complemento: "",
                numero: "",
                referencia: "",
                bairro: ""
            }
        }

        return dicionario;

    }catch(error){

        return {

            message: error
        };
    }
}


// async function ListarUsuario(filtros){

//     if(filtros.hasOwnProperty("pesquisa")) {

//         const dados = await db.collection("usuarios")
//         .where("pesquisa", "==", filtros.)
//         .get();
//     }
// }