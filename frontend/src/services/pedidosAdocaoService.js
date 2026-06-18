const API_URL = "http://localHost:3001";

async function AdicionarRelatorio(dadosRelatorio){

    const resposta = {
        erros: {},
        dadosRelatorio: dadosRelatorio,
        erroBackEnd: false,
        mensageError: "",
        dados: null,
    }

    Object.keys(dadosRelatorio).forEach((key, index) => {

        if (!dadosRelatorio[key]){

            resposta.erros[key] = true;
            resposta.mensageError = "Preencha todos os campos";

        } else{

            resposta.erros[key] = false;
        }
    })

    if(!Object.keys(resposta.erros).every((key) => resposta.erros[key] === false)) return resposta;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(dadosRelatorio.email)){

        resposta.erros.email = true;
        resposta.mensageError = "Digite um email válido."

        return resposta;
    }

    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!regexCpf.test(dadosRelatorio.cpf)){

        resposta.erros.cpf = true;
        resposta.mensageError = "Digite um CPF válido."

        return resposta;
    }

    const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;

    if (!regexTelefone.test(dadosRelatorio.telefone)){

        resposta.erros.telefone = true;
        resposta.mensageError = "Digite um telefone válido.";

        return resposta;
    }

    const [ dia, mes, ano ] = dadosRelatorio.dataNasc.split(/[\/\-., ]+/);

    const data = new Date(ano, mes, dia);

    if(isNaN(data.getTime())) resposta.erros.dataNasc = true;

    try{
        const responseBackEnd = await fetch(`${API_URL}/pedidosAdocao/adicionarPedidoAdocao`, {
            method: "POST",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dadosPedidoAdocao: dadosRelatorio
            }),
        })

        const dados = await responseBackEnd.json();

        if(!responseBackEnd.ok){

            console.log("Erro ao adicionar Pedido de Adoção: " + dados.error);

            resposta.erroBackEnd = true;
            resposta.mensageError = "Erro ao adicionar Pedido de Adoção"

            return resposta;
        }

        resposta.dados = dados;

        return resposta;

    } catch (error){

        console.log("Erro ao adicionar Relatório:", error);

        resposta.erroBackEnd = true;
        resposta.mensageError = "Erro ao adicionar Relatório";

        return resposta;
    }
}

async function ListarRelatorios(filtros){

    try{

        const filtrosPadrao = {
            pesquisa: "",
            limit: 50,
        }

        const filtrosFinal = {
            ...filtrosPadrao,
            ...filtros
        };

        const parametros = new URLSearchParams();

        parametros.append("filtros", JSON.stringify(filtrosFinal));

        const response = await fetch(`${API_URL}/pedidosAdocao/listarPedidosAdocao?${parametros}`, {
            method: "GET",
            headers:  {
                "Content-Type": "application/json",
            },
        })

        const dados = await response.json();

        if(!response.ok){

            console.log("Erro ao listar Relatorios: " + dados.error);
            return [];
        }
        
        return dados;

    } catch (error){

        console.log("Erro ao acessar rota do backend: ", error);

        return [];
    }
}


async function DeletarRelatorio(pedidosAdocaoId) {
    
    try{
        const response = await fetch(`${API_URL}/pedidosAdocao/deletarPedidoAdocao`, {
            method: "DELETE",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pedidosAdocaoId: pedidosAdocaoId
            }),
        })

        const dados = await response.json();

        if(!response.ok){

            console.log("Erro ao deletar Relatório");

            return null;
        }

        return dados;

    } catch (error){

        console.log("Erro ao deletar Relatório:", error);

        return null;
    }
    
}


async function EditarRelatorio(pedidoAdocaoId, novosDados) {
    
    console.log("Editar Relatório - idRelatorio:", pedidoAdocaoId, "novosDados:", novosDados);

    try{
        const response = await fetch(`${API_URL}/pedidosAdocao/editarPedidoAdocao`, {
            method: "PUT",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pedidoAdocaoId: pedidoAdocaoId,
                novosDados: novosDados,
            }),
        })

        const dados = await response.json();

        if(!response.ok){

            console.log("Erro ao editar Relatório");

            return null;
        }

        return dados;

    } catch (error){

        console.log("Erro ao editar relatório:", error);

        return null;
    }
}

export { AdicionarRelatorio, ListarRelatorios, DeletarRelatorio, EditarRelatorio };