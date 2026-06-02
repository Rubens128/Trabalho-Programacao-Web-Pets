class Pet{
    constructor(id, adicionadoEm, dataNasc, descricao, donoId, especie, fotoPetUrl, local, nome, status){

        this.id = id;
        this.adicionadoEm = adicionadoEm;
        this.dataNasc = dataNasc;
        this.descricao = descricao;
        this.donoId = donoId;
        this.especie = especie;
        this.fotoPetUrl = fotoPetUrl;
        this.local = local;
        this.nome = nome;
        this.status = status;
    }
}

export default Pet;