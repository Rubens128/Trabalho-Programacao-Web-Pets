import styles from "./formularioAdicao.module.css";
import Header from "../../components/Header/header";
import InputComponent from "../../components/Input/input";
import ButtonComponent from "../../components/Button/button";
import SelectComponent from "../../components/Select/select";
import TextInputComponent from "../../components/TextInput/textInput";
import imgMichaelPet from "../../assets/imagemMichaelPet.png";
import { useState } from "react";
import { FaFileCircleCheck } from "react-icons/fa6";
import { ImFilePicture } from "react-icons/im";
import { RiInfoCardLine } from "react-icons/ri";
import { FaHeartPulse } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { PiHeadsetBold } from "react-icons/pi";
import { Bs1Circle } from "react-icons/bs";
import { Bs2Circle } from "react-icons/bs";
import { Bs3Circle } from "react-icons/bs";
import { Bs4Circle } from "react-icons/bs";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { verificarUsuarioLogado } from '../../services/authService.js';

function FormularioAdicao() {

    const [nomePet, setNomePet] = useState("");
    const [nomeCientifico, setNomeCientifico] = useState("");
    const [idade, setIdade] = useState(null);
    const [dataNascimento, setDataNascimento] = useState("");
    const [sexo, setSexo] = useState("");
    const [cor, setCor] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [temperamento, setTemperamento] = useState("");
    const [origem, setOrigem] = useState("");
    const [motivoAnuncio, setMotivoAnuncio] = useState("");
    const [ usuario, setUsuario ] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        
        async function verificarUsuario() {
        
        const retornoUsuario = await verificarUsuarioLogado();
        
        if (retornoUsuario.tipo !== "adm"){
          navigate("/");
        }

        setUsuario(retornoUsuario);
        }
        
        verificarUsuario();

    }, [navigate]);

    return (

        <div>

            <Header usuario={usuario}/>

            <div className={styles.divPrincipal}>
                <h1 style={{ color: "#d6a559" }}>Cadastro de um novo Pet</h1>
                <div className={styles.divComponentes}>

                    <div className={styles.divComponentesConjuntoInscricao}>
                        <h1>1.Informações Básicas</h1>
                        <div>
                            <label for="nomePet" >Nome do pet *</label>
                            <InputComponent variavel={nomePet} funcaoSetVariavel={setNomePet}
                                placeholder="Digite o nome do pet" id="nomePet" width="100%" />
                        </div>

                        <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                            <div>
                                <label for="nomeCientifico">Nome Cientifíco *</label>
                                <InputComponent variavel={nomeCientifico} funcaoSetVariavel={setNomeCientifico}
                                    placeholder="'Eublepharis macularius'" id="nomeCientifico" width="100%" />
                            </div>
                            <div>
                                <label for="telefone">Idade aproximada *</label>
                                <InputComponent variavel={idade} funcaoSetVariavel={setIdade}
                                    placeholder="Digite a idade aproximada" id="idade" width="100%" />
                            </div>
                        </div>
                        <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                            <div>
                                <label for="email">Data Nascimento *</label>
                                <InputComponent variavel={dataNascimento} funcaoSetVariavel={setDataNascimento}
                                    placeholder="DD/MM/AAAA" id="dataNascimento" width="100%" />
                            </div>
                            <div>
                                <label for="sexo">Sexo *</label>
                                <InputComponent variavel={sexo} funcaoSetVariavel={setSexo}
                                    placeholder="Digite o sexo do animal" id="sexo" width="100%" />
                            </div>
                        </div>

                        <div className={styles.divComponentesCaracteristica}>
                            <h1>2. Características do pet</h1>
                            <div className={styles.divComponentesCaracteristicaConjunto}>
                                <div>
                                    <label for="cor">Cor/Padrão *</label>
                                    <InputComponent variavel={cor} funcaoSetVariavel={setCor}
                                        placeholder="Descreva a cor ou padrão do pet" id="cor" width="100%" />
                                </div>
                                <div>
                                    <label for="peso">Peso *</label>
                                    <InputComponent variavel={peso} funcaoSetVariavel={setPeso}
                                        placeholder="Digite o peso do pet" id="peso" width="100%" />
                                </div>
                                <div>
                                    <label for="altura">Altura *</label>
                                    <InputComponent variavel={altura} funcaoSetVariavel={setAltura}
                                        placeholder="Digite a altura do pet" id="cor" width="100%" />
                                </div>
                            </div>
                            <div className={styles.divComponentesCaracteristicaConjunto}>
                                <div>
                                    <label for="temperamento">Descreva o temperamento/comportamento do pet *</label>
                                    <TextInputComponent variavel={temperamento} funcaoSetVariavel={setTemperamento}
                                        placeholder="Dócil e amigável..." id="experimento" width="100%" height="20dvh" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.divComponentesFoto}>

                            <h1>3.Fotos do pet</h1>
                            <h3>Adicione fotos nítidas do pet de diferentes ângulos</h3>
                            <div className={styles.divComponentesFotoConjunto}>

                            </div>
                        </div>

                        <div className={styles.divComponentesOrigem}>
                            <h1>4.Origem do pet</h1>
                            <div className={styles.divComponentesOrigemConjunto}>
                                <label>Conte-nos um pouco sobre a origem do pet e sua história com ele *: </label>
                                <TextInputComponent variavel={origem} funcaoSetVariavel={setOrigem}
                                    placeholder="..." id="origem" width="100%" height="20dvh" />
                            </div>
                            <div className={styles.divComponentesOrigemConjunto}>
                                <p>Documento De origem</p>
                            </div>
                        </div>

                        <div className={styles.divComponentesComentario}>
                            <h1>5.Comentários</h1>
                            <label>Conte-nos porque tem interesse em doar esse pet (opcional):</label>
                            <TextInputComponent variavel={motivoAnuncio} funcaoSetVariavel={setMotivoAnuncio}
                                placeholder="..." id="experienciaUsuario" width="100%" height="20dvh" />
                        </div>
                        <ButtonComponent textoBotao="Enviar Formulário" variante={1} />
                    </div>

                    <div className={styles.divCardsLaterais}>

                        <div className={styles.divCardsLateraisBox}>
                            <div className={styles.divCardsLateraisParagrafos}>
                                <div className={styles.divCardsLateraisIconeTexto}>
                                    <FaFileCircleCheck color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Informações verdadeiras</h1>
                                </div>
                                <p>Seja honesto em todas as informacoes. Isso aumenta as chances de encontrar o lar ideal para o pet.</p>
                            </div>
                            <div className={styles.divCardsLateraisParagrafos}>
                                <div className={styles.divCardsLateraisIconeTexto}>
                                    <ImFilePicture color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Fotos de qualidade</h1>
                                </div>
                                <p>Fotos claras e em boa iluminaçao ajudam na avaliaçao do cadastro.</p>
                            </div>
                            <div className={styles.divCardsLateraisParagrafos}>
                                <div className={styles.divCardsLateraisIconeTexto}>
                                    <RiInfoCardLine color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Detalhes Importam</h1>
                                </div>
                                <p>Quanto mais completo o cadastro, melhor sera a analise da nossa equipe.</p>
                            </div>
                            <div className={styles.divCardsLateraisParagrafos}>
                                <div className={styles.divCardsLateraisIconeTexto}>
                                    <FaHeartPulse color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Bem-estar sempre</h1>
                                </div>
                                <p>Nosso compromisso e com a seguranca, saude e bem-estar dos pets exoticos.</p>
                            </div>
                        </div>

                        <div className={styles.divCardsLateraisBox}>
                            <div className={styles.divCardsLateraisParagrafos}>
                                <div className={styles.divCardsLateraisIconeTexto}>
                                    <FaRegClock color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Precisa de Ajuda?</h1>
                                </div>
                            </div>
                            <div className={styles.divCardsLateraisParagrafos}>
                                <h1>Fale com nossa equipes especializada e tire todas as suas duvidas antes de finalizar a sua adoção</h1>
                            </div>
                            <ButtonComponent textoBotao="Falar com especialista" variante={1} icone={PiHeadsetBold} />
                        </div>

                        <div className={styles.divCardsLateraisBoxEtapas}>
                            <div className={styles.divCardsLateraisParagrafos}>
                                <div className={styles.divCardsLateraisIconeTexto}>
                                    <Bs1Circle color="#d6a559" size={30} />
                                    <h3 style={{fontSize: "18px"}}>Preencha o formulario com todas as informações</h3>
                                </div>
                                <div className={styles.divCardsLateraisIconeTexto}>
                                    <Bs2Circle color="#d6a559" size={25} />
                                    <h3 style={{fontSize: "18px"}}>Nossa equipe analisará seu cadastro</h3>
                                </div>
                                 <div className={styles.divCardsLateraisIconeTexto}>
                                    <Bs3Circle color="#d6a559" size={28} />
                                    <h3 style={{fontSize: "18px"}}>Entraremos em contato para mais detalhes</h3>
                                </div>
                                <div className={styles.divCardsLateraisIconeTexto}>
                                    <Bs4Circle color="#d6a559" size={34} />
                                    <h3 style={{fontSize: "18px"}}>Seu pet poderá encontrar um novo lar responsável!</h3>
                                </div>
                            </div>
                            <img src={imgMichaelPet}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormularioAdicao;