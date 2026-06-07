import styles from "./admGerenciar.module.css"
import Header from "../../components/Header/header";
import CardInfoAdmComponent from "../../components/CardInfoAdm/cardInfoAdm";
import ButtonComponent from "../../components/Button/button";
import TabelaAdmComponent from "../../components/TabelaAdm/tabelaAdm";
import PopUpComponent from "../../components/popUp/popUp.js";
import { HiUsers } from "react-icons/hi2";
import { useState } from "react";
import { IoPaw } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { verificarUsuarioLogado } from '../../services/authService.js';
import { listarPets } from "../../services/petsService.js";
import { deletarPet } from "../../services/petsService.js";

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
  /*const [ usuariosInfo, setUsuariosInfo ] = useState([new Usuario(

  )])*/

  // registros temporarios de usuarios e animais.
  const [usuarios, setUsuarios] = useState([
    {
      nome: "Ana Souza",
      email: "ana.souza@email.com",
      tipo: "Administrador",
      data: "2024-01-10",
      petsAdicionado: 8,
      petsAdotados: 2,
      acoes: "Editar",
    },
    {
      nome: "Bruno Lima",
      email: "bruno.lima@email.com",
      tipo: "Usuário",
      data: "2024-01-15",
      petsAdicionado: 3,
      petsAdotados: 1,
      acoes: "Editar",
    },
    {
      nome: "Carla Mendes",
      email: "carla.mendes@email.com",
      tipo: "Voluntário",
      data: "2024-02-02",
      petsAdicionado: 12,
      petsAdotados: 4,
      acoes: "Editar",
    },
    {
      nome: "Diego Alves",
      email: "diego.alves@email.com",
      tipo: "Usuário",
      data: "2024-02-18",
      petsAdicionado: 1,
      petsAdotados: 3,
      acoes: "Editar",
    },
    {
      nome: "Eduarda Rocha",
      email: "eduarda.rocha@email.com",
      tipo: "Administrador",
      data: "2024-03-05",
      petsAdicionado: 15,
      petsAdotados: 6,
      acoes: "Editar",
    },
    {
      nome: "Felipe Costa",
      email: "felipe.costa@email.com",
      tipo: "Usuário",
      data: "2024-03-12",
      petsAdicionado: 4,
      petsAdotados: 0,
      acoes: "Editar",
    },
    {
      nome: "Gabriela Nunes",
      email: "gabriela.nunes@email.com",
      tipo: "Voluntário",
      data: "2024-03-25",
      petsAdicionado: 10,
      petsAdotados: 5,
      acoes: "Editar",
    }
  ]);

  const [petsLista, setPetsLista] = useState([]);

  const [usuario, setUsuario] = useState(null);
  const [petIdDeletar, setPetIdDeletar] = useState(null);
  const [popUpConfimacaoAtivo, setPopUpConfimacaoAtivo] = useState(false);
  const [mensagemPopUpAviso, setMensagemPopUpAviso] = useState("");
  const [mensagemPopUpAvisoSucesso, setMensagemPopUpAvisoSucesso] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    async function verificarUsuario() {

      const retornoUsuario = await verificarUsuarioLogado();

      if (retornoUsuario.tipo !== "adm") {
        navigate("/");
      }

      setUsuario(retornoUsuario);
    }

    async function coletarPets() {
      const petsLista = await listarPets();

      setPetsLista(petsLista);
    }

    verificarUsuario();
    coletarPets();

  }, [navigate]);

  async function deletarPetHandle() {
        
        setPopUpConfimacaoAtivo(false);

        const resposta = await deletarPet(petIdDeletar);

        if(!resposta){

            setMensagemPopUpAvisoSucesso(false);
            setMensagemPopUpAviso("Erro ao deletar o pet.")

            setTimeout(() =>{
                setMensagemPopUpAviso("");
            }, 3000);

            setPetIdDeletar(null);

            return;
        }

        setMensagemPopUpAvisoSucesso(true);
        setMensagemPopUpAviso("Sucesso ao deletar o pet.");

        setTimeout(() =>{
            setMensagemPopUpAviso("");
        }, 3000);

        setPetsLista((petsAntigos) => petsAntigos.filter((pet) => pet.id !== petIdDeletar))

        setPetIdDeletar(null);
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

            <TabelaAdmComponent tabelaExpandida={tabelaExpandida} numTabelaExpandida={1} listaDados={usuarios} />
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
              }} />
          </div>
        </div>
      </div>

      {
        popUpConfimacaoAtivo ?

          <PopUpComponent mensagem={"Deseja mesmo remover o pet?"} mensagemSucesso={false}
            popUpConfirmacao={true} funcaoCancelar={() => {
              setPetIdDeletar(null);
              setPopUpConfimacaoAtivo(false);
            }} funcaoConfirmar={deletarPetHandle} />

          : ""
      }

      {
        mensagemPopUpAviso ?

          <PopUpComponent mensagem={mensagemPopUpAviso} mensagemSucesso={mensagemPopUpAvisoSucesso} />

          : ""
      }
    </div>
  );
}

export default AdmGerenciar;