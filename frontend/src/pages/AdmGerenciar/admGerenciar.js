import styles from "./admGerenciar.module.css"
import Header from "../../components/Header/header";
import CardInfoAdmComponent from "../../components/CardInfoAdm/cardInfoAdm";
import ButtonComponent from "../../components/Button/button";
import TabelaAdmComponent from "../../components/TabelaAdm/tabelaAdm";
import PopUpComponent from "../../components/popUp/popUp.js";
import SelectComponent from "../../components/Select/select.js";
import { HiUsers } from "react-icons/hi2";
import { useState } from "react";
import { IoPaw } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { verificarUsuarioLogado } from '../../services/authService.js';
import { listarPets, deletarPet } from "../../services/petsService.js";
import { ListarUsuarios, DeletarUsuario, EditarUsuario } from "../../services/userService.js";

/*class Usuario {
    constructor(){
        this.nome = "";
        this.email = "";
        this.tipo = "";
        this.data = "";
        this.petsAdicionado = 0;
        this.petsAdotados = 0;
        this.acoes = "";
    }
}*/

function AdmGerenciar() {

  const [tabelaExpandida, setTabelaExpandida] = useState(0);
  const [usuariosLista, setUsuariosLista] = useState([]);
  const [petsLista, setPetsLista] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [petIdDeletar, setPetIdDeletar] = useState(null);
  const [usuarioNomeDeletar, setUsuarioNomeDeletar] = useState("");
  const [popUpConfimacaoAtivo, setPopUpConfimacaoAtivo] = useState(false);
  const [mensagemPopUpAviso, setMensagemPopUpAviso] = useState("");
  const [mensagemPopUpAvisoSucesso, setMensagemPopUpAvisoSucesso] = useState(false);
  const [editarTipoUsuario, setEditarTipoUsuario] = useState({nome: "teste", tipo: "Administrador"});

  const navigate = useNavigate();

  useEffect(() => {

    async function verificarUsuario() {

      const retornoUsuario = await verificarUsuarioLogado();

      if (retornoUsuario?.tipo !== "adm") {
        navigate("/");
      }

      setUsuario(retornoUsuario);
    }

    async function coletarPets() {
      const petsLista = await listarPets();

      setPetsLista(petsLista);
    }

    async function coletarUsuarios(params) {
      
      const usuariosLista = await ListarUsuarios();

      console.log(usuariosLista);

      setUsuariosLista(usuariosLista);
    } 

    verificarUsuario();
    coletarPets();
    coletarUsuarios();

  }, [navigate]);

  async function deletarPetouUsuarioHandle(deletarUsuarioVariavel = false) {

    setPopUpConfimacaoAtivo(false);
    
    let resposta;

    if(deletarUsuarioVariavel === true){

      resposta = await DeletarUsuario(petIdDeletar);

    } else{

      resposta = await deletarPet(petIdDeletar);
    }

    if (!resposta) {

      setMensagemPopUpAvisoSucesso(false);
      setMensagemPopUpAviso("Erro ao deletar")

      setTimeout(() => {
        setMensagemPopUpAviso("");
      }, 3000);

      setPetIdDeletar(null);

      return;
    }

    setMensagemPopUpAvisoSucesso(true);
    setMensagemPopUpAviso("Sucesso ao deletar");

    setTimeout(() => {
      setMensagemPopUpAviso("");
    }, 3000);

    if(deletarUsuarioVariavel === true){

      setUsuariosLista((usuariosAntigos) => usuariosAntigos.filter((usuario) => usuario.nome !== usuarioNomeDeletar));

      setUsuarioNomeDeletar("");

    }else{

      setPetsLista((petsAntigos) => petsAntigos.filter((pet) => pet.id !== petIdDeletar))

      setPetIdDeletar(null);
    }
    
  }

  async function editarUsuarioHandle() {
    
    const usuarioComTipoAntigo = usuariosLista.find((usuario) => usuario.nome === editarTipoUsuario.nome)

    let resposta;

    if(usuarioComTipoAntigo?.tipo === editarTipoUsuario?.tipo) resposta = true; 
    else resposta = await EditarUsuario(editarTipoUsuario.nome, editarTipoUsuario);

    if (!resposta) {

      setMensagemPopUpAvisoSucesso(false);
      setMensagemPopUpAviso("Erro ao editar a permissão")

      setTimeout(() => {
        setMensagemPopUpAviso("");
      }, 3000);

      setEditarTipoUsuario(null);

      return;
    }

    setMensagemPopUpAvisoSucesso(true);
    setMensagemPopUpAviso("Sucesso ao editar a permissão ");

    setTimeout(() => {
      setMensagemPopUpAviso("");
    }, 3000);

    setUsuariosLista((usuarios) => usuarios.map(
        (usuario => usuario.nome === editarTipoUsuario.nome ? {...usuario, tipo: editarTipoUsuario.tipo} : usuario)
        ))

    setEditarTipoUsuario(null);
  }

  return (
    <div>
      <Header usuario={usuario} />
      <div className={styles.divGeral}>
        <div className={styles.divGeralInfos}>

          <CardInfoAdmComponent nomeDado={"Usuários Cadastrados"} quantidade={1200}
            porcentagem={"↑ 12% esse mês"} icone={HiUsers} sizeIcone={50} porcentagemPositiva={true} />

          <CardInfoAdmComponent nomeDado={"Pets Disponíveis"} quantidade={128}
            porcentagem={"↓ 2% esse mês"} icone={IoPaw} sizeIcone={50} porcentagemPositiva={false} />

          <CardInfoAdmComponent nomeDado={"Pets adotados"} quantidade={15}
            porcentagem={"↓ 8% esse mês"} icone={FaHeart} sizeIcone={50} porcentagemPositiva={false} />

          <CardInfoAdmComponent nomeDado={"Solicitações Pendentes"} quantidade={27}
            porcentagem={"↑ 4% esse mês"} icone={IoDocumentText} sizeIcone={50} porcentagemPositiva={true} />

        </div>

        <div className={styles.divGeralUserPets}>

          <div className={styles.divGeralUserPetsGeral}
            style={{ width: tabelaExpandida === 1 ? "100%" : "50%", display: tabelaExpandida === 2 ? "none" : "flex" }}>
            <div className={styles.divGeralUserPetsGeralTitulo}>
              <div className={styles.divGeralUserPetsGeralTituloTexts}>
                <h1>Usuários</h1>
                <p>Gerencie as contas dos usuários</p>
              </div>
              {
                tabelaExpandida === 0 ?
                  <ButtonComponent variante={2} textoBotao={"Expandir"} width="25%"
                    funcaoBotao={() => setTabelaExpandida(1)} />
                  :
                  <ButtonComponent variante={2} textoBotao={"Reduzir"} width="25%"
                    funcaoBotao={() => setTabelaExpandida(0)} />
              }

            </div>

            <TabelaAdmComponent tabelaExpandida={tabelaExpandida} numTabelaExpandida={1} listaDados={usuariosLista} 
              funcaoDeletar={(nome) => {
                setPopUpConfimacaoAtivo(true);
                setUsuarioNomeDeletar(nome);
              }} funcaoEditar={(usuario) => setEditarTipoUsuario(usuario)}/>
          </div>

          <div className={styles.divGeralUserPetsGeral}
            style={{ width: tabelaExpandida === 2 ? "100%" : "50%", display: tabelaExpandida === 1 ? "none" : "flex" }}>
            <div className={styles.divGeralUserPetsGeralTitulo}>
              <div className={styles.divGeralUserPetsGeralTituloTexts}>
                <h1>Pets</h1>
                <p>Gerencie os pets disponiveis para adoção</p>
              </div>
              {
                tabelaExpandida === 0 ?
                  <ButtonComponent variante={2} textoBotao={"Expandir"} width="25%"
                    funcaoBotao={() => setTabelaExpandida(2)} />
                  :
                  <ButtonComponent variante={2} textoBotao={"Reduzir"} width="25%"
                    funcaoBotao={() => setTabelaExpandida(0)} />
              }

            </div>

            <TabelaAdmComponent tabelaExpandida={tabelaExpandida}
              numTabelaExpandida={2} listaDados={petsLista} tabelaParaUsuario={false} funcaoDeletar={(petId) => {
                setPopUpConfimacaoAtivo(true);
                setPetIdDeletar(petId);
              }}/>
          </div>
        </div>
      </div>

      {
        popUpConfimacaoAtivo ?

          <PopUpComponent mensagem={"Deseja mesmo deletar?"} mensagemSucesso={false}
            popUpConfirmacao={true} funcaoCancelar={() => {
              setPetIdDeletar(null);
              setUsuarioNomeDeletar("");
              setPopUpConfimacaoAtivo(false);
            }} funcaoConfirmar={() => deletarPetouUsuarioHandle(petIdDeletar === null)} />

          : ""
      }

      {
        mensagemPopUpAviso ?

          <PopUpComponent mensagem={mensagemPopUpAviso} mensagemSucesso={mensagemPopUpAvisoSucesso} />

          : ""
      }

      {
        editarTipoUsuario !== null ?

          <div className={styles.popUpEditar}>
            <h1> {editarTipoUsuario?.nome} </h1>
            <p>Alterar permissão do Usuario:</p>
            <SelectComponent variavel={editarTipoUsuario?.tipo}
              funcaoSetVariavel={(novoTipo) => setEditarTipoUsuario((infoUsuario) => ({
                ...infoUsuario,
                tipo: novoTipo
              }))} opcoes={["Administrador", "Usuário", "Voluntário"]}/>
            <div className={styles.popUpEditarDivBotoes}>
              <ButtonComponent variante={1} textoBotao="Cancelar" funcaoBotao={() => setEditarTipoUsuario(null)}/>
              <ButtonComponent variante={2} textoBotao="Confirmar" funcaoBotao={editarUsuarioHandle}/>
            </div>
          </div>

        : ""
      }
    </div>
  );
}

export default AdmGerenciar;