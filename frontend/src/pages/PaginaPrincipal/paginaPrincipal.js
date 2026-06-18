import './paginaPrincipal.css';
import Header from '../../components/Header/header.js';
import CardPet from '../../components/CardPet/cardPet.js'
import ReptilImg from '../../assets/reptil.png';
import MamiferoImg from '../../assets/mamifero.png';
import AvesImg from '../../assets/aves.png';
import AnfibioImg from '../../assets/anfibio.png';
import PeixesImg from '../../assets/peixes.png';
import InvertebradosImg from '../../assets/invertebrados.png';
import LuvaImg from '../../assets/luva.png';
import ChapeuImg from '../../assets/chapeu.png';
import MichaelImg from '../../assets/michael.png';
import SuporteImg from '../../assets/suporte.png'; 
import HealWorldImg from '../../assets/imagemHealWorld.png';
import ButtonComponent from '../../components/Button/button.js';
import { IoPaw } from "react-icons/io5";
import { FaRedhat } from "react-icons/fa";
import { FiShield } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { verificarUsuarioLogado } from '../../services/userService.js';
import { listarPets } from '../../services/petsService.js';

function PaginaPrincipal() {

  const navigate = useNavigate();

  const [ usuario, setUsuario ] = useState(null);
  const [animaisInfoDestaque, setAnimaisInfoDestaque] = useState(null);

  useEffect(() => {
    
    async function verificarUsuario() {
      
      const retornoUsuario = await verificarUsuarioLogado();
      
      setUsuario(retornoUsuario);
    }

    async function coletarPets() {

      const petsLista = await listarPets({
        limit: 5,
        recentes: true,
      });

      setAnimaisInfoDestaque(petsLista);
    }

    verificarUsuario();
    coletarPets();

  }, []);

  return(
    <div>

      <Header usuario={usuario}/>
      
      <div className="divInfoSite">
        <div className="divInfoSiteTextos">
          <h1>Encontre seu</h1>
          <h1>novo melhor amigo</h1>
          <h1 className="divInfoSiteTextosExotico">Exótico!</h1>
          <p>Adoção responsável de pets unicos:</p>
          <p>conectando pessoas a pets exóticos</p>
          <p>com amor e consciência</p>
        </div>
        <div className='divInfoSiteBotoes'>
          <ButtonComponent variante={1} icone={IoPaw} iconeSize={18} width={"45%"} 
          textoBotao="Quero Adotar" funcaoBotao={() => navigate("/listaPets")}/>
          <ButtonComponent variante={2} icone={FaRedhat} iconeSize={20} width={"45%"} 
          textoBotao="Quero Adicionar" funcaoBotao={() => navigate("/formularioAdicao")}/>
        </div>
        <div className='divInfoSiteGarantias'>
          <p> <FiShield color='#9f6d18' size={30}/> Ambiente Seguro</p>
          <p> <FaRegHeart color='#9f6d18' size={30}/> Animais Saudáveis</p>
          <p> <TfiHeadphoneAlt color='#9f6d18' size={30}/> Suporte Especializado</p>
        </div>
      </div>

      <div className='divSelecaoAnimais'>
        <div className='divSelecaoAnimaisInfo'>
          <h1>O que você está procurando?</h1>
          <div className='divSelecaoAnimaisInfoOpcoes'>

            <div className='divSelecaoAnimaisInfoOpcoesItem'>
              <img src={ReptilImg} alt='imagem de réptil'></img>
              <p>Répteis</p>
              <a href='/listaPets?filtro=repteis'>Ver mais +</a>
            </div>

            <div className='divSelecaoAnimaisInfoOpcoesItem'>
              <img src={MamiferoImg} alt='imagem de mamífero'></img>
              <p>Mamíferos</p>
              <a href='/listaPets?filtro=mamiferos'>Ver mais +</a>
            </div>

            <div className='divSelecaoAnimaisInfoOpcoesItem'>
              <img src={AvesImg} alt='imagem de ave'></img>
              <p>Aves</p>
              <a href='/listaPets?filtro=aves'>Ver mais +</a>
            </div>

            <div className='divSelecaoAnimaisInfoOpcoesItem'>
              <img src={AnfibioImg} alt='imagem de anfíbio'></img>
              <p>Anfíbios</p>
              <a href='/listaPets?filtro=anfibios'>Ver mais +</a>
            </div>

            <div className='divSelecaoAnimaisInfoOpcoesItem'>
              <img src={PeixesImg} alt='imagem de peixe'></img>
              <p>Peixes</p>
              <a href='/listaPets?filtro=peixe'>Ver mais +</a>
            </div>

            <div className='divSelecaoAnimaisInfoOpcoesItem'>
              <img src={InvertebradosImg} alt='imagem de invertebrados'></img>
              <p>Invertebrados</p>
              <a href='/listaPets?filtro=invertebrados'>Ver mais +</a>
            </div>

          </div>
        </div>

        <div className='divSelecaoAnimaisGarantias'>

          <div className='divSelecaoAnimaisGarantiasCard'>
            <img src={LuvaImg} alt='imagem de luva'/>
            <div className='divSelecaoAnimaisGarantiasCardTexto'>
              <h1>Adoçao Responsável</h1>
              <p>Todos os pets disponiveis para adoçao possuem historico e cuidados garantidos.</p>
            </div>
          </div>

          <div className='divSelecaoAnimaisGarantiasCard'>
            <img src={ChapeuImg} alt='imagem de luva'/>
            <div className='divSelecaoAnimaisGarantiasCardTexto'>
              <h1>Compra Segura</h1>
              <p>Animais de criadouros responsáveis, com garantia de saude e procedencia.</p>
            </div>
          </div>

          <div className='divSelecaoAnimaisGarantiasCard'>
            <img src={MichaelImg} alt='imagem de luva'/>
            <div className='divSelecaoAnimaisGarantiasCardTexto'>
              <h1>Guia de Cuidados</h1>
              <p>Conteudo completo para voce cuidar do seu pet exotico da melhor forma.</p>
            </div>
          </div>

          <div className='divSelecaoAnimaisGarantiasCard'>
            <img src={SuporteImg} alt='imagem de luva'/>
            <div className='divSelecaoAnimaisGarantiasCardTexto'>
              <h1>Suporte Especializado</h1>
              <p>Nossa equipe esta pronta para tirar duvidas antes e depois da adocao ou compra.</p>
            </div>
          </div>

        </div>

      </div>

      <div className='divPetsDestaque'>
        {/*<CardPet nomeAnimal={"Tito"} nomeEspecie={"Ouriço Africano"} local={"São Paulo, SP"}/>*/}
        <h1 className='divPetsDestaqueTitulo'>Pets em destaque</h1>
        <div className='divPetsDestaqueCard'>
          {animaisInfoDestaque?.map((animal, index) => {
            if(index >= 5) return "";
            return (
              <CardPet pet={animal} width='18%' height='100%' />
            );
          })}
        </div>
      </div>

      <div className="divVerTodosPets">
        <img src={HealWorldImg} alt='Imagem do michael com luzes amarelas'/>
        <h1>Heal the world, <br/>Adote o amor!</h1>
        <p>Seu novo companheiro <br/>pode estar te esperando! <br/> <span>Adoção consciente pode transformar vidas.</span></p>
        <div className="divVerTodosPetsDivBotao">
          <ButtonComponent variante={2} icone={IoPaw} iconeSize={18} iconeNaFrente={true} 
          textoBotao="Ver todos os pets" funcaoBotao={() => navigate("/listaPets")}/>
        </div>
      </div>
    </div>
  );
}

export default PaginaPrincipal;