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
import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { verificarUsuarioLogado, EditarUsuario } from '../../services/userService.js';
import { AdicionarPet } from "../../services/petsService.js";
import { FiUpload } from "react-icons/fi";

function FormularioAdicao() {

    const [nomePet, setNomePet] = useState("");
    const [especie, setEspecie] = useState("");
    const [local, setLocal] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [sexo, setSexo] = useState("");
    const [cor, setCor] = useState("");
    const [porte, setPorte] = useState("");
    const [altura, setAltura] = useState("");
    const [temperamento, setTemperamento] = useState("");
    const [origem, setOrigem] = useState("");
    const [descricao, setDescricao] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [erroPreenchimento, setErroPreenchimento] = useState({
        nome: false,
        especie: false,
        local: false,
        dataNasc: false,
        sexo: false,
        cor: false,
        porte: false,
        altura: false,
        temperamento: false,
        descricao: false,
    });
    const [popUpConfimacaoAtivo, setPopUpConfimacaoAtivo] = useState(false);
    const [mensagemPopUpAviso, setMensagemPopUpAviso] = useState("");
    const [mensagemPopUpAvisoSucesso, setMensagemPopUpAvisoSucesso] = useState(false);
    const [arquivoValue, setArquivoValue] = useState(undefined);
    const [arquivoPreview, setArquivoPreview] = useState(null);

    const inputRefs = useRef({});

    const navigate = useNavigate();

    useEffect(() => {
        
        async function verificarUsuario() {
        
        const retornoUsuario = await verificarUsuarioLogado();
        
        if (!retornoUsuario){
          navigate("/login");
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
            nome: nomePet,
            antigoDono: usuario?.id || null,
            descricao: descricao,
            especie: especie,
            local: local,
            dataNasc: dataNascimento,
            sexo: sexo,
            cor: cor,
            porte: porte,
            altura: altura,
            temperamento: temperamento,
            origem: origem,
            descricao: descricao,
            fotoPetUrl: "/images/ourico.png"
        }

        const resposta = await AdicionarPet(dadosPet);

        if(Object.keys(resposta.erros || {}).length > 0){

            console.log("Erros de preenchimento:", resposta.erros);

            setErroPreenchimento((dados) => ({
                ...dados,
                ...resposta.erros
            }))

            const primeiroErroIndex = Object.keys(resposta.erros).find((key) => resposta.erros[key] === true);

            inputRefs.current[primeiroErroIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });

            inputRefs.current[primeiroErroIndex]?.focus();

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

        const respostaEditarUsuario = await EditarUsuario(usuario.id, 
            {petsAdicionados: usuario.petsAdicionados ? usuario.petsAdicionados + 1 : 1});

        setMensagemPopUpAvisoSucesso(true);
        setMensagemPopUpAviso("Sucesso ao adicionar o pet.");

        setTimeout(() =>{
            setMensagemPopUpAviso("");
            navigate("/");
        }, 3000);

    }

    async function handleFile(event) {

        const file = event.target.files[0];

        if(file){

            setArquivoValue(file);
            setArquivoPreview(URL.createObjectURL(file));
        }   
    }

    useEffect(() => {

        return () => {
            
            if(arquivoPreview){
                URL.revokeObjectURL(arquivoPreview);
            }
        };

    }, [arquivoPreview]);

    return (

        <div>

            <Header usuario={usuario}/>

            <div className={styles.divPrincipal}>
                <h1 style={{ color: "#d6a559" }}>Cadastro de um novo Pet</h1>
                <div className={styles.divComponentes}>

                    <div className={styles.divComponentesConjuntoInscricao}>
                        <h1>1.Informações Básicas</h1>
                        <div>
                            <label htmlFor="nomePet" >Nome do pet *</label>
                            <InputComponent variavel={nomePet} funcaoSetVariavel={setNomePet}
                                placeholder="Digite o nome do pet" id="nomePet" width="100%" error={erroPreenchimento.nome}
                                ref={inputRefs} nomeRef="nome"/>
                        </div>

                        <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                            <div>
                                <label htmlFor="nomeCientifico">Espécie *</label>
                                <SelectComponent variavel={especie} funcaoSetVariavel={setEspecie}
                                        opcoes={["mamiferos", "repteis", "aves", "anfibios", "peixes", "invertebrados"]} 
                                        width="100%" error={erroPreenchimento.especie} 
                                        ref={inputRefs} nomeRef="especie"/>
                            </div>
                            <div>
                                <label htmlFor="telefone">Local Atual *</label>
                                <InputComponent variavel={local} funcaoSetVariavel={setLocal}
                                    placeholder="Digite o local atual, ex: São Paulo SP" id="idade" width="100%" error={erroPreenchimento.local}
                                    ref={inputRefs} nomeRef="local"/>
                            </div>
                        </div>
                        <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                            <div>
                                <label htmlFor="email">Data Nascimento *</label>
                                <InputComponent variavel={dataNascimento} funcaoSetVariavel={setDataNascimento}
                                    placeholder="DD/MM/AAAA" id="dataNascimento" width="100%" error={erroPreenchimento.dataNasc}
                                    ref={inputRefs} nomeRef="dataNasc"/>
                            </div>
                            <div>
                                <label htmlFor="sexo">Sexo *</label>
                                <InputComponent variavel={sexo} funcaoSetVariavel={setSexo}
                                    placeholder="Digite o sexo do animal" id="sexo" width="100%" error={erroPreenchimento.sexo}
                                    ref={inputRefs} nomeRef="sexo"/>
                            </div>
                        </div>

                        <div className={styles.divComponentesCaracteristica}>
                            <h1>2. Características do pet</h1>
                            <div className={styles.divComponentesCaracteristicaConjunto}>
                                <div>
                                    <label htmlFor="cor">Cor/Padrão *</label>
                                    <InputComponent variavel={cor} funcaoSetVariavel={setCor}
                                        placeholder="Descreva a cor ou padrão do pet" id="cor" width="100%" error={erroPreenchimento.cor}
                                        ref={inputRefs} nomeRef="cor"/>
                                </div>
                                <div>
                                    <label htmlFor="porte">Porte *</label>
                                    <SelectComponent variavel={porte} funcaoSetVariavel={setPorte}
                                            opcoes={["pequeno", "medio", "grande"]} width="100%" error={erroPreenchimento.porte} 
                                            ref={inputRefs} nomeRef="porte"/>
                                </div>
                                <div>
                                    <label htmlFor="altura">Altura *</label>
                                    <InputComponent variavel={altura} funcaoSetVariavel={setAltura}
                                        placeholder="Digite a altura do pet" id="altura" width="100%" error={erroPreenchimento.altura}
                                        ref={inputRefs} nomeRef="altura"/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.divComponentesFoto}>

                            <h1>3.Fotos do pet</h1>
                            <h3>Adicione fotos nítidas do pet de diferentes ângulos</h3>
                            <div className={styles.divComponentesFotoConjunto}>
                                <label htmlFor="inputImage" className={styles.divComponentesFotoConjuntoLabel}>
                                    {arquivoPreview ? "" : <p> <FiUpload size={30}/> Upload da foto </p>}
                                    {arquivoPreview ? <img src={arquivoPreview || ""}/> : ""}
                                </label>
                                <input style={{display: "none"}} type="file" onChange={handleFile} 
                                id="inputImage" variavel={arquivoValue} ref={inputRefs} nomeRef="inputImage"/>
                            </div>
                        </div>

                        <div className={styles.divComponentesComentario}>
                            <h1>4.Descrição</h1>
                            <label>Faça uma breve descrição do pet:</label>
                            <TextInputComponent variavel={descricao} funcaoSetVariavel={setDescricao}
                                placeholder="..." id="experienciaUsuario" width="100%" height="20dvh"
                                ref={inputRefs} nomeRef="descricao" error={erroPreenchimento.descricao}/>
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