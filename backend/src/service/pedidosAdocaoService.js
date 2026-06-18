import { db } from "../config/firebase.js";

async function ListarPedidosAdocaoService(filtros) {
    try {
                
        const pedidosAdocaoSnapshot = await db.collection("pedidosAdocao")
            .limit(filtros.limit)
            .get();

        const pedidosAdocaoLista = pedidosAdocaoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return pedidosAdocaoLista;

    } catch (error) {

        console.log("Erro ao listar pedidos de adoção:", error);

        throw new Error("Erro ao listar pedidos de adoção" + error.message);
    }
}

async function AdicionarPedidoAdocaoService(dadosPedidoAdocao) {
 
    try {
        
        await db.collection("pedidosAdocao").add(dadosPedidoAdocao);

        return { sucesso: true };

    } catch (error) {

        console.log("Erro ao adicionar pedido de adoção: " +  error);

        throw new Error("Erro ao adicionar pedido de adoção" + error.message);
    }
}

async function DeletarPedidoAdocaoService(pedidoId) {
    
    try {
        await db.collection("pedidosAdocao").doc(pedidoId).delete();

        return { sucesso: true };

    } catch (error) {

        console.log("Erro ao deletar pedido de adoção:", error);

        throw new Error("Erro ao deletar pedido de adoção", error);
    }

}

async function EditarPedidoAdocaoService(pedidoId, dadosAtualizados) {

    try {
        await db.collection("pedidosAdocao").doc(pedidoId).update({
             ...dadosAtualizados,
        });

        return { sucesso: true };
        
    } catch (error) {
        
        console.log("Erro ao editar pedido de adoção:", error);

        throw new Error("Erro ao editar pedido de adoção", error);
    }
}

export { ListarPedidosAdocaoService, AdicionarPedidoAdocaoService, DeletarPedidoAdocaoService, EditarPedidoAdocaoService };