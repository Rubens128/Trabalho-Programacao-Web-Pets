class PedidosAdocao{
    constructor(id, antigoDonoId, mensagem, novoDonoId, petId, status){

        this.id = id;
        this.antigoDonoId = antigoDonoId;
        this.mensagem = mensagem;
        this.novoDonoId = novoDonoId;
        this.petId = petId;
        this.status = status;
    }
}

export default PedidosAdocao;