import { AdicionarUsuarioService, ListarUsuariosService, DeletarUsuarioService, EditarUsuariosService } from "../service/usuarioService.js";

async function AdicionarUsuario(req, res) {

    const usuarioDict = req.body;

    if(!usuarioDict || Object.keys(usuarioDict).length === 0) {
        return res.status(400).json({ error: "Dados do usuário não fornecidos" });
    }

    if (usuarioDict.email === "" || usuarioDict.email === null
        || usuarioDict.nome === "" || usuarioDict.nome === null) {

        return res.status(400).json({ error: "Dados não fornecidos" });
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(usuarioDict.email)) return res.status(400).json({ error: "Email inválido" });

    try {
        const usuario = await AdicionarUsuarioService(usuarioDict);

        return res.status(200).json({ mensagem: "Usuário adicionado com sucesso", usuario: usuario });

    } catch (error) {

        console.error("Erro ao adicionar usuário:", error);

        return res.status(500).json({ error: "Erro ao adicionar usuário" });
    }
}

async function ListarUsuarios(req, res) {
    
    const filtrosRecebidos = req.query.filtros;

    const filtros = filtrosRecebidos ? JSON.parse(filtrosRecebidos) : null;

    if (filtros === null) return res.status(400).json({ error: "Filtros não fornecidos" });

    try {

        const listaUsuarios = await ListarUsuariosService(filtros);

        const listaUsuariosFormatada = listaUsuarios.map((usuario) => ({
            ...usuario,
            criadoEm: usuario.criadoEm ? usuario.criadoEm.toDate().toLocaleDateString("pt-BR") : "",
        }));

        return res.status(200).json(listaUsuariosFormatada);

    } catch (error) {

        console.error("Erro ao listar usuários:", error);
        return res.status(500).json({ error: "Erro ao listar usuários" });
    }
}

async function DeletarUsuario(req, res) {
    
    const { userId } = req.body;

    if(!userId) return res.status(400).json({ error: "ID do usuário não fornecido" });

    try{
        await DeletarUsuarioService(userId);

        return res.status(200).json({ mensagem: "Usuário deletado com sucesso" });

    } catch (error) {

        console.error("Erro ao deletar usuário:", error);

        return res.status(500).json({ error: "Erro ao deletar usuário" });
    }
}

async function EditarUsuario(req, res) {
    
    const { userId, novosDados } = req.body;

    if(!userId || !novosDados) return res.status(400).json({ error: "Dados insuficientes para edição" });

    try{

        await EditarUsuariosService(userId, novosDados);

        return res.status(200).json({ mensagem: "Usuário editado com sucesso" });

    } catch (error) {

        console.error("Erro ao editar usuário:", error);
        
        return res.status(500).json({ error: "Erro ao editar usuário" });
    }
}

async function RetornoUsuario(req, res) {

    try{
        const usuario = await ListarUsuariosService({ userId: req.usuario.uid });

        return res.status(200).json({usuario: usuario});

    } catch(error) {

        console.error("Erro ao retornar usuário:", error);

        return res.status(500).json({ message: "Erro ao retornar usuário." });
    }
}

export { AdicionarUsuario, ListarUsuarios, DeletarUsuario, EditarUsuario, RetornoUsuario };