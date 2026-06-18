import { ListarPedidosAdocaoService, AdicionarPedidoAdocaoService, DeletarPedidoAdocaoService, EditarPedidoAdocaoService } from "../service/pedidosAdocaoService.js";

async function ListarPedidosAdocao(req, res) {

    const filtrosRecebidos = req.query.filtros;

    const filtros = filtrosRecebidos ? JSON.parse(filtrosRecebidos) : null;

    if (filtros === null) return res.status(400).json({ error: "Filtros não fornecidos" });

    try {

        const listaPedidosAdocao = await ListarPedidosAdocaoService(filtros);

        const listaPedidosAdocaoFormatada = listaPedidosAdocao.map((pedido) => ({
            ...pedido,
            dataPedido: pedido.dataPedido ? pedido.dataPedido.toDate().toLocaleDateString("pt-BR") : "",
        }));

        return res.status(200).json(listaPedidosAdocaoFormatada);

    } catch (error) {

        console.error("Erro ao listar pedidos de adoção:", error);

        return res.status(500).json({ error: "Erro ao listar pedidos de adoção" + error.message });
    }
}

async function AdicionarPedidoAdocao(req, res) {

    const { dadosPedidoAdocao } = req.body;

    if(!dadosPedidoAdocao) return res.status(400).json({ error: "Dados do pedido de adoção não fornecidos" });

    if(Object.values(dadosPedidoAdocao).some(value => value === null || value === undefined || value === "")){

        console.log("Dados do pedido de adoção incompletos: ", Object.values(dadosPedidoAdocao));

        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const dadosFormatados = {
        
        antigoDonoId: dadosPedidoAdocao.antigoDonoId,
        novoDonoId: dadosPedidoAdocao.novoDonoId,
        petId: dadosPedidoAdocao.petId,
        comentarios: dadosPedidoAdocao.comentarios,
        dataPedido: new Date(),
        status: "pendente",
        ambiente: {
            areaExternaSegura: dadosPedidoAdocao.areaExternaSegura,
            outrosAnimais: dadosPedidoAdocao.outrosAnimais,
            tipoMoradia: dadosPedidoAdocao.tipoMoradia,
            posseMoradia: dadosPedidoAdocao.posseMoradia,
        },
        experiencia: {
            tevePet: dadosPedidoAdocao.tevePet,
            experienciaAnterior: dadosPedidoAdocao.experienciaUsuario,
        },
        endereco:{
            cep: dadosPedidoAdocao.cep,
            estado: dadosPedidoAdocao.estado,
            cidade: dadosPedidoAdocao.cidade,
            bairro: dadosPedidoAdocao.bairro,
            numero: dadosPedidoAdocao.numero,
            complemento: dadosPedidoAdocao.complemento,
        }
    }

    try{

        await AdicionarPedidoAdocaoService(dadosFormatados);

        return res.status(201).json({ mensagem: "Pedido de adoção adicionado com sucesso" });

    } catch (error) {

        console.error("Erro ao adicionar pedido de adoção:", error);

        return res.status(500).json({ error: "Erro ao adicionar pedido de adoção" });
    }

}

async function DeletarPedidoAdocao(req, res) {

    const { pedidosAdocaoId } = req.body;

    if(!pedidosAdocaoId) return res.status(400).json({ error: "ID do pedido de adoção não fornecido" });

    try{
        await DeletarPedidoAdocaoService(pedidosAdocaoId);

        return res.status(200).json({ mensagem: "Pedido de adoção deletado com sucesso" });

    } catch (error) {

        console.error("Erro ao deletar pedido de adoção:", error);

        return res.status(500).json({ error: "Erro ao deletar pedido de adoção" });
    }

}

async function EditarPedidoAdocao(req, res) {

    const { pedidoAdocaoId, novosDados } = req.body;

    if(!pedidoAdocaoId || !novosDados) return res.status(400).json({ error: "Dados insuficientes para edição" });

    try{

        await EditarPedidoAdocaoService(pedidoAdocaoId, novosDados);

        return res.status(200).json({ mensagem: "Pedido de adoção editado com sucesso" });

    } catch (error) {

        console.error("Erro ao editar pedido de adoção:", error);
        
        return res.status(500).json({ error: "Erro ao editar pedido de adoção" });
    }
}

export { ListarPedidosAdocao, AdicionarPedidoAdocao, DeletarPedidoAdocao, EditarPedidoAdocao };