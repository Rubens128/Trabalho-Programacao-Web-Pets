import { ListarPetsService, EditarPetsService, DeletarPetService, AdicionarPetService } from "../service/petsService.js";

async function ListarPets(req, res) {

    const filtrosRecebidos = req.query.filtros;

    const filtros = filtrosRecebidos ? JSON.parse(filtrosRecebidos) : null;

    console.log("Filtros recebidos:", filtros);

    if (filtros === null) return res.status(400).json({ error: "Filtros não fornecidos" });

    if(filtros.usuario.userId !== null){

        try{

            const listaPets = await ListarPetsService({userId: filtros.usuario.userId});

            const listaPetsFormatada = listaPets.map((pet) => ({
                ...pet,
                dataNasc: pet.dataNasc ? pet.dataNasc.toDate().toLocaleDateString("pt-BR") : "",
                adicionadoEm: pet.adicionadoEm ? pet.adicionadoEm.toDate().toLocaleDateString("pt-BR") : "",
            }));

            return res.status(200).json(listaPetsFormatada);

        } catch (error) {

            console.error("Erro ao listar pets:", error);

            return res.status(500).json({ error: "Erro ao listar pets" });
        }

    }

    let especies = [];

    if (filtros.filtroEspecie.todos === true) {

        especies = ["repteis", "mamiferos", "aves", "anfibios", "peixes", "invertebrados"];

    } else {

        Object.keys(filtros.filtroEspecie).forEach((especie, index) => {
            if (index === 0) return;

            if (filtros.filtroEspecie[especie] === true) {
                especies.push(especie);
            }
        });
    }

    let portes = [];

    if (filtros.filtroPorte.todos === true) {

        portes = ["pequeno", "medio", "grande"];

    } else {
        Object.keys(filtros.filtroPorte).forEach((porte, index) => {
            if (index === 0) return;

            if (filtros.filtroPorte[porte] === true) {
                portes.push(porte);
            }
        });
    }

    const dataAtual = new Date();

    const dataMaxNasc = new Date(
        dataAtual.getFullYear() - filtros.idadeMin - 1,
        dataAtual.getMonth(),
        dataAtual.getDate() + 1
    );

    const dataMinNasc = new Date(
        dataAtual.getFullYear() - filtros.idadeMax,
        dataAtual.getMonth(),
        dataAtual.getDate()
    );

    try {

        const listaPets = await ListarPetsService({
            userId: null,
            especies: especies,
            portes: portes,
            dataMinNasc: dataMinNasc,
            dataMaxNasc: dataMaxNasc,
            limit: filtros.limit,
            petId: filtros.petId,
            pesquisa: filtros.pesquisa ? filtros.pesquisa : "",
        });

        const listaPetsFormatada = listaPets.map((pet) => ({
            ...pet,
            dataNasc: pet.dataNasc ? pet.dataNasc.toDate().toLocaleDateString("pt-BR") : "",
            adicionadoEm: pet.adicionadoEm ? pet.adicionadoEm.toDate().toLocaleDateString("pt-BR") : "",
        }));

        return res.status(200).json(listaPetsFormatada);

    } catch (error) {

        console.error("Erro ao listar pets:", error);

        return res.status(500).json({ error: "Erro ao listar pets" });
    }
}

async function EditarPets(req, res) {

    const { petId, novosDados } = req.body;

    if(!petId || !novosDados) return res.status(400).json({ error: "Dados insuficientes para edição" });

    try{

        novosDados.dataNasc = new Date(novosDados.dataNasc);

        await EditarPetsService(petId, novosDados);

        return res.status(200).json({ mensagem: "Pet editado com sucesso" });

    } catch (error) {

        console.error("Erro ao editar pet:", error);
        
        return res.status(500).json({ error: "Erro ao editar pet" });
    }

}

async function DeletarPet(req, res) {

    const { petId } = req.body;

    if(!petId) return res.status(400).json({ error: "ID do pet não fornecido" });

    try{
        await DeletarPetService(petId);

        return res.status(200).json({ mensagem: "Pet deletado com sucesso" });

    } catch (error) {

        console.error("Erro ao deletar pet:", error);

        return res.status(500).json({ error: "Erro ao deletar pet" });
    }
}

async function AdicionarPet(req, res) {

    const { dadosPet } = req.body;

    if(!dadosPet) return res.status(400).json({ error: "Dados do pet não fornecidos" });

    const dadosFormatados = {
        adicionadoEm: new Date(),
        antigoDono: dadosPet.antigoDono,
        dataNasc: new Date(dadosPet.dataNasc),
        descricao: dadosPet.descricao,
        especie: dadosPet.especie,
        fotoPetUrl: dadosPet.fotoPetUrl,
        local: dadosPet.local,
        nome: dadosPet.nome.trim().charAt(0).toUpperCase() + dadosPet.nome.trim().slice(1),
        porte: dadosPet.porte,
        status: "disponivel",
    }

    try{

        await AdicionarPetService(dadosFormatados);

        return res.status(201).json({ mensagem: "Pet adicionado com sucesso" });

    } catch (error) {

        console.error("Erro ao adicionar pet:", error);

        return res.status(500).json({ error: "Erro ao adicionar pet" });
    }

}

export { ListarPets, EditarPets, DeletarPet, AdicionarPet };