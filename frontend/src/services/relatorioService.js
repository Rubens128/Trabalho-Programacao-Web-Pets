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

        if (index > 18) return;

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

    try{
        const responseBackEnd = await fetch(`${API_URL}/testeRelatorioAdicionar`, {
            method: "POST",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dadosRelatorio
            }),
        })

        const dados = await responseBackEnd.json();

        if(!responseBackEnd.ok){

            console.log("Erro ao adicionar Relatório");

            resposta.erroBackEnd = true;
            resposta.mensageError = "Erro ao adicionar Relatório"

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
            userId: null,
            limit: 50,
        }

        const filtrosFinal = {
            ...filtrosPadrao,
            ...filtros
        };

        const response = await fetch(`${API_URL}/testeRelatorioListar`, {
            method: "GET",
            headers:  {
                "Content-Type": "application/json",
            },
        })

        const dados = await response.json();

        if(!response.ok){

            console.log("Erro ao listar Relatorios");
            return [];
        }
    
        return dados;

    } catch (error){

        console.log("Erro ao acessar rota do backend: ", error);

        return [];
    }
}


async function DeletarRelatorio(idRelatorio) {
    
    try{
        const response = await fetch(`${API_URL}/testeRelatorioDeletar`, {
            method: "DELETE",
            headers:  {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idRelatorio
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


async function EditarRelatorio(idRelatorio, novosDados) {
    
    try{
        const response = await fetch(`${API_URL}/testeRelatorioEditar`, {
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