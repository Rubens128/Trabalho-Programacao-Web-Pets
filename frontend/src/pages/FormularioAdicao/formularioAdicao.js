import styles from "./formularioAdicao.module.css";
import Header from "../../components/Header/header";
import InputComponent from "../../components/Input/input";
import ButtonComponent from "../../components/Button/button";
import SelectComponent from "../../components/Select/select";
import TextInputComponent from "../../components/TextInput/textInput";
import imgMichaelPet from "../../assets/imagemMichaelPet.png";
import PopUpComponent from "../../components/popUp/popUp.js";
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
import { AdicionarPet } from "../../services/petsService.js";

function FormularioAdicao() {

    const [nomePet, setNomePet] = useState("");
    const [especie, setEspecie] = useState("");
    const [local, setLocal] = useState(null);
    const [dataNascimento, setDataNascimento] = useState("");
    const [sexo, setSexo] = useState("");
    const [cor, setCor] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [temperamento, setTemperamento] = useState("");
    const [origem, setOrigem] = useState("");
    const [motivoAnuncio, setMotivoAnuncio] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [erroPreenchimento, setErroPreenchimento] = useState({
        nomePet: false,
        especie: false,
        local: false,
        dataNascimento: false,
        sexo: false,
        cor: false,
        peso: false,
        altura: false,
        temperamento: false,
    });
    const [popUpConfimacaoAtivo, setPopUpConfimacaoAtivo] = useState(false);
    const [mensagemPopUpAviso, setMensagemPopUpAviso] = useState("");
    const [mensagemPopUpAvisoSucesso, setMensagemPopUpAvisoSucesso] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        
        async function verificarUsuario() {
        
        const retornoUsuario = await verificarUsuarioLogado();
        
        if (retornoUsuario?.tipo !== "adm"){
          navigate("/");
        }

        setUsuario(retornoUsuario);
        }
        
        verificarUsuario();

    }, [navigate]);

    async function AdicionarPetHandle(){

        setErroPreenchimento((erros) => 
            Object.fromEntries(
                Object.keys(erros || {}).map((erro) => [erro, false])
            )
        );

        const dadosPet = {
            nomePet: nomePet,
            especie: especie,
            local: local,
            dataNascimento: dataNascimento,
            sexo: sexo,
            cor: cor,
            peso: peso,
            altura: altura,
            temperamento: temperamento,
            origem: origem,
            motivoAnuncio: motivoAnuncio,
        }

        const resposta = await AdicionarPet(dadosPet);

        if(Object.keys(resposta.erros || {}).length > 0){

            setErroPreenchimento((dados) => ({
                ...dados,
                ...resposta.erros
            }))

            return;
        }

        if(resposta.erroBackEnd){

            setMensagemPopUpAvisoSucesso(false);
            setMensagemPopUpAviso("Erro ao adicionar o pet.")

            setTimeout(() =>{
                setMensagemPopUpAviso("");
            }, 3000);

            return;
        }

        setMensagemPopUpAvisoSucesso(true);
        setMensagemPopUpAviso("Sucesso ao adicionar o pet.");

        setTimeout(() =>{
            setMensagemPopUpAviso("");
            navigate("/");
        }, 3000);

    }

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
                                placeholder="Digite o nome do pet" id="nomePet" width="100%" error={erroPreenchimento.nomePet}/>
                        </div>

                        <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                            <div>
                                <label for="nomeCientifico">Espécie *</label>
                                <InputComponent variavel={especie} funcaoSetVariavel={setEspecie}
                                    placeholder="'Beagle, Macaco Prego...'" id="nomeCientifico" width="100%" error={erroPreenchimento.especie}/>
                            </div>
                            <div>
                                <label for="telefone">Local Atual *</label>
                                <InputComponent variavel={local} funcaoSetVariavel={setLocal}
                                    placeholder="Digite o local atual, ex: São Paulo SP" id="idade" width="100%" error={erroPreenchimento.local}/>
                            </div>
                        </div>
                        <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                            <div>
                                <label for="email">Data Nascimento *</label>
                                <InputComponent variavel={dataNascimento} funcaoSetVariavel={setDataNascimento}
                                    placeholder="DD/MM/AAAA" id="dataNascimento" width="100%" error={erroPreenchimento.dataNascimento}/>
                            </div>
                            <div>
                                <label for="sexo">Sexo *</label>
                                <InputComponent variavel={sexo} funcaoSetVariavel={setSexo}
                                    placeholder="Digite o sexo do animal" id="sexo" width="100%" error={erroPreenchimento.sexo}/>
                            </div>
                        </div>

                        <div className={styles.divComponentesCaracteristica}>
                            <h1>2. Características do pet</h1>
                            <div className={styles.divComponentesCaracteristicaConjunto}>
                                <div>
                                    <label for="cor">Cor/Padrão *</label>
                                    <InputComponent variavel={cor} funcaoSetVariavel={setCor}
                                        placeholder="Descreva a cor ou padrão do pet" id="cor" width="100%" error={erroPreenchimento.cor}/>
                                </div>
                                <div>
                                    <label for="peso">Peso *</label>
                                    <InputComponent variavel={peso} funcaoSetVariavel={setPeso}
                                        placeholder="Digite o peso do pet" id="peso" width="100%" error={erroPreenchimento.peso}/>
                                </div>
                                <div>
                                    <label for="altura">Altura *</label>
                                    <InputComponent variavel={altura} funcaoSetVariavel={setAltura}
                                        placeholder="Digite a altura do pet" id="cor" width="100%" error={erroPreenchimento.altura} />
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
                        <ButtonComponent textoBotao="Enviar Formulário" variante={1} funcaoBotao={AdicionarPetHandle}/>
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

            {
                mensagemPopUpAviso ?

                <PopUpComponent mensagem={mensagemPopUpAviso} mensagemSucesso={mensagemPopUpAvisoSucesso}/>

                : ""
            }
        </div>
    );
}

export default FormularioAdicao;