import { db } from "../config/firebase.js";
import { Filter } from "firebase-admin/firestore";

async function ListarPetsService(filtros) {
    try {

        if(filtros.userId === null){

            let petsSnapshot;

            console.log(filtros);

            if(filtros.petId === null){
                
                petsSnapshot = await db.collection("pets")
                    .where("especie", "in", filtros.especies)
                    .where("porte", "in", filtros.portes)
                    .where("dataNasc", ">=", filtros.dataMinNasc)
                    .where("dataNasc", "<=", filtros.dataMaxNasc)
                    .orderBy("nome")
                    .startAt(filtros.pesquisa)
                    .endAt(filtros.pesquisa + "\uf8ff")
                    .limit(filtros.limit)
                    .get();

            } else {
                petsSnapshot = await db.collection("pets")
                    .doc(filtros.petId)
                    .get();
            }

            const petsLista = petsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            return petsLista;
        
        } else {

            const petsSnapshot = await db.collection("pets")
                .where(
                    Filter.or(
                        Filter.where("antigoDono", "==", filtros.userId),
                        Filter.where("novoDono", "==", filtros.userId)
                    )
                )
                .get();
            
            const petsLista = petsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            return petsLista;
        }

    } catch (error) {

        console.error("Erro ao listar pets:", error);

        throw new Error("Erro ao listar pets");
    }
}

async function EditarPetsService(petId, novosDados) {

    try {
        await db.collection("pets").doc(petId).update({
             ...novosDados,
        });

        return { sucesso: true };
        
    } catch (error) {
        
        console.log("Erro ao editar pet:", error);

        throw new Error("Erro ao editar pet", error);
    }
}

async function DeletarPetService(petId) {

    try {
        await db.collection("pets").doc(petId).delete();

        return { sucesso: true };

    } catch (error) {

        console.log("Erro ao deletar pet:", error);

        throw new Error("Erro ao deletar pet", error);
    }
}

async function AdicionarPetService(dadosPet) {

    try {
        await db.collection("pets").add({
            ...dadosPet,
        });

        return { sucesso: true };

    } catch (error) {

        console.log("Erro ao adicionar pet:", error);

        throw new Error("Erro ao adicionar pet", error);
    }
}

export { ListarPetsService, EditarPetsService, DeletarPetService, AdicionarPetService };