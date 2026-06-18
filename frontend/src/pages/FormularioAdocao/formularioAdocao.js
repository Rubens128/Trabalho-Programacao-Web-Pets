import styles from "./formularioAdocao.module.css";
import Header from "../../components/Header/header";
import InputComponent from "../../components/Input/input";
import ButtonComponent from "../../components/Button/button";
import SelectComponent from "../../components/Select/select";
import PopUpComponent from "../../components/popUp/popUp.js";
import TextInputComponent from "../../components/TextInput/textInput";
import AveImg from "../../assets/aves.png";
import michaelLuaImg from "../../assets/michaelLua.png";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { IoMdPin } from "react-icons/io";
import { LuBrain } from "react-icons/lu";
import { GiWeight } from "react-icons/gi";
import { FaDrumstickBite } from "react-icons/fa";
import { BsHouseHeart } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { GiPawHeart } from "react-icons/gi";
import { FaCheckSquare } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { PiHeadsetBold } from "react-icons/pi";
import { Bs1Circle } from "react-icons/bs";
import { Bs2Circle } from "react-icons/bs";
import { Bs3Circle } from "react-icons/bs";
import { Bs4Circle } from "react-icons/bs";
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { verificarUsuarioLogado } from '../../services/userService.js';
import { listarPets } from "../../services/petsService.js";
import { AdicionarRelatorio } from "../../services/pedidosAdocaoService.js";


function FormularioAdocao({ gender = "macho" }) {

    const [nomeCompleto, setNomeCompleto] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [tipoMoradia, setTipoMoradia] = useState("");
    const [posseMoradia, setPosseMoradia] = useState("");
    const [areaExternaSegura, setAreaExternaSegura] = useState("");
    const [outrosAnimais, setOutrosAnimais] = useState("");
    const [tevePet, setTevePet] = useState("");
    const [experienciaUsuario, setExperienciaUsuario] = useState("");
    const [comentarios, setComentarios] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [petDados, setPetDados] = useState(null);
    const [popUpConfimacaoAtivo, setPopUpConfimacaoAtivo] = useState(false);
    const [mensagemPopUpAviso, setMensagemPopUpAviso] = useState("");
    const [mensagemPopUpAvisoSucesso, setMensagemPopUpAvisoSucesso] = useState(false);
    const [editarTipoUsuario, setEditarTipoUsuario] = useState(null);
    const [erros, setErros] = useState({
        nomeCompleto: false,
        telefone: false,
        email: false,
        dataNasc: false,
        cpf: false,
        cep: false,
        estado: false,
        cidade: false,
        bairro: false,
        numero: false,
        complemento: false,
        tipoMoradia: false,
        posseMoradia: false,
        areaExternaSegura: false,
        outrosAnimais: false,
        tevePet: false,
        comentarios:false
    });

    const { petId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        
        async function verificarUsuario() {
        
            const retornoUsuario = await verificarUsuarioLogado();
            
            if(!retornoUsuario) navigate("/login");

            setNomeCompleto(retornoUsuario?.nome || "");
            setEmail(retornoUsuario?.email || "");
            setCep(retornoUsuario?.endereco.cep || "");
            setEstado(retornoUsuario?.endereco.estado || "");
            setCidade(retornoUsuario?.endereco.cidade || "");
            setBairro(retornoUsuario?.endereco.bairro || "");
            setNumero(retornoUsuario?.endereco.numero || "");
            setComplemento(retornoUsuario?.endereco.complemento || "");

            setUsuario(retornoUsuario);
        }

        async function buscarPetInfo() {
        
            const petLista = await listarPets({petId: petId});

            const pet = petLista ? petLista[0] : null;

            if(!pet){
                navigate("/");
                return;

            }

            if(pet.status !== "disponivel"){
                navigate("/");
                return;
            }

            setPetDados(pet);
        }

        buscarPetInfo();

        verificarUsuario();

    }, [petId, navigate]);

    async function formularioEnviarHandle() {
        
        const dados = {
            petId: petId,
            antigoDonoId: petDados?.antigoDono || "",
            novoDonoId: usuario.id,
            nomeCompleto: nomeCompleto,
            telefone: telefone,
            email: email,
            dataNasc: dataNascimento,
            cpf: cpf,
            cep: cep,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            numero: numero,
            complemento: complemento,
            tipoMoradia: tipoMoradia,
            posseMoradia: posseMoradia,
            areaExternaSegura: areaExternaSegura,
            outrosAnimais: outrosAnimais,
            tevePet: tevePet,
            experienciaUsuario: experienciaUsuario,
            comentarios: comentarios,
        }

        const resposta = await AdicionarRelatorio(dados);
        
        if(!Object.keys(resposta.erros).every((key) => resposta.erros[key] === false)) {
            
            setErros(resposta.erros);

            return;
        }else

        if (resposta.erroBackEnd) {

            setMensagemPopUpAvisoSucesso(false);
            setMensagemPopUpAviso("Erro ao criar o relatorio, tente novamente.");

            setTimeout(() => {
                setMensagemPopUpAviso("");
            }, 3000);

            return;
        }

        setMensagemPopUpAvisoSucesso(true);
        setMensagemPopUpAviso("Sucesso ao criar o relatorio");

        setTimeout(() => {
            setMensagemPopUpAviso("");
            navigate("/");
        }, 3000);

    }

    return (

        <div>
            <Header usuario={usuario}/>
            <div className={styles.divPrincipal}>

                <div className={styles.divComponentes}>
                    <h1>Conheça seu novo amigo!</h1>
                    <div className={styles.divComponentesPet}>
                        <div className={styles.divComponentesPetSpace}>
                            <img src={AveImg} alt="Imagem do Pet Selecionado" />
                            <div className={styles.divComponentesPetInfos}>
                                <h1>{petDados?.nome}</h1>
                                <p><FaRegUser color="#d6a559" size={23} />Nome: {petDados?.nome}</p>
                                <p><FaPaw color="#d6a559" size={23} />Espécie:  {petDados?.especie}</p>
                                <p><CiCalendar color="#d6a559" size={23} />Idade:  {petDados?.dataNasc}</p>
                                <p>{gender === "macho" ? <BsGenderMale color="#d6a559" size={23} /> : <BsGenderFemale color="#d6a559" size={23} />}Sexo: Masculino</p>
                                <p><IoMdPin color="#d6a559" size={23} />Origem: {petDados?.local}</p>
                                <p><LuBrain color="#d6a559" size={23} />Temperamento: mudar</p>
                                <p><GiWeight color="#d6a559" size={23} />Peso Atual: mudar</p>
                            </div>
                        </div>

                        <div className={styles.divComponentesPetAdicional}>
                            <div className={styles.divComponentesPetAdicionalCuidados}>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <FaDrumstickBite color="#d6a559" size={30} />
                                    <h1>Alimentação:<p>Inseto vivos(grilos, tenébrios)</p></h1>
                                </div>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <BsHouseHeart color="#d6a559" size={30} />
                                    <h1>Habitat ideal:<p>Terrario com esconderijos, aquecimento e umidade controlada</p></h1>
                                </div>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <FaPeopleGroup color="#d6a559" size={30} />
                                    <h1>Convive com outros?<p>Não indicado</p></h1>
                                </div>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <IoWarningOutline color="#d6a559" size={30} />
                                    <h1>Necessidades especiais:<p>Nenhuma</p></h1>
                                </div>
                                <ButtonComponent textoBotao="Saiba mais sobre a espécie +" variante={2} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.divGeralDeBaixo}>
                        <div className={styles.divCardsDeBaixo}>
                            <div className={styles.divCardsLateraisBox}>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <GiPawHeart color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Adoção Responsável</h1>
                                </div>
                                <h1>Ao adotar esse Pet, voce se compromete a oferecer cuidado, respeito e qualidade de vida por toda a vida dele.</h1>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <FaCheckSquare color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Ambiente Adequado</h1>
                                </div>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <FaCheckSquare color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Alimentação Correta</h1>
                                </div>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <FaCheckSquare color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Cuidados Veterinários</h1>
                                </div>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <FaCheckSquare color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Muito amor e atenção</h1>
                                </div>
                            </div>

                            <div className={styles.divCardsLateraisBox}>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <FaRegClock color="#d6a559" size={30} />
                                    <h1 style={{ color: "#d6a559" }}>Precisa de Ajuda?</h1>
                                </div>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <h1>Fale com nossa equipes especializada e tire todas as suas duvidas antes de finalizar a sua adoção</h1>
                                </div>
                                <ButtonComponent textoBotao="Falar com especialista" variante={1} icone={PiHeadsetBold} />
                            </div>

                            <div className={styles.divCardsLateraisBoxEtapas}>
                                <div className={styles.divCardsLateraisParagrafos}>
                                    <div className={styles.divCardsLateraisIconeTexto}>
                                        <Bs1Circle color="#d6a559" size={30} />
                                        <h3 style={{ fontSize: "18px" }}>Preencha o formulario com todas as informações</h3>
                                    </div>
                                    <div className={styles.divCardsLateraisIconeTexto}>
                                        <Bs2Circle color="#d6a559" size={25} />
                                        <h3 style={{ fontSize: "18px" }}>Nossa equipe analisará sua solicitação</h3>
                                    </div>
                                    <div className={styles.divCardsLateraisIconeTexto}>
                                        <Bs3Circle color="#d6a559" size={28} />
                                        <h3 style={{ fontSize: "18px" }}>Entraremos em contato para mais informações</h3>
                                    </div>
                                    <div className={styles.divCardsLateraisIconeTexto}>
                                        <Bs4Circle color="#d6a559" size={34} />
                                        <h3 style={{ fontSize: "18px" }}>Se aprovado, você poderá conhecer seu novo amigo!</h3>
                                    </div>
                                </div>
                                <img src={michaelLuaImg}></img>
                            </div>

                        </div>

                        <div className={styles.divComponentesConjuntoInscricao}>
                            <h1>1.Sobre você</h1>
                            <div>
                                <label htmlFor="nomeCompleto" >Nome Completo *</label>
                                <InputComponent variavel={nomeCompleto} funcaoSetVariavel={setNomeCompleto}
                                    placeholder="Digite seu nome completo" id="nomeCompleto" width="100%" error={erros.nomeCompleto}/>
                            </div>

                            <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                                <div>
                                    <label htmlFor="cpf">CPF *</label>
                                    <InputComponent variavel={cpf} funcaoSetVariavel={setCpf}
                                        placeholder="000.000.000-00" id="cpf" width="100%" error={erros.cpf}/>
                                </div>
                                <div>
                                    <label htmlFor="telefone">Telefone / WhatsApp *</label>
                                    <InputComponent variavel={telefone} funcaoSetVariavel={setTelefone}
                                        placeholder="(00) 00000-0000" id="telefone" width="100%" error={erros.telefone}/>
                                </div>
                            </div>
                            <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                                <div>
                                    <label htmlFor="email">E-mail *</label>
                                    <InputComponent variavel={email} funcaoSetVariavel={setEmail}
                                        placeholder="Digite seu email" id="email" width="100%" error={erros.email}/>
                                </div>
                                <div>
                                    <label htmlFor="dataNascimento">Data Nascimento *</label>
                                    <InputComponent variavel={dataNascimento} funcaoSetVariavel={setDataNascimento}
                                        placeholder="DD/MM/AAAA" id="dataNascimento" width="100%" error={erros.dataNasc}/>
                                </div>
                            </div>

                            <div className={styles.divComponentesConjuntoInscricaoFormularioEndereco}>
                                <h2>Endereço</h2>

                                <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                                    <div>
                                        <label htmlFor="cep">CEP </label>
                                        <InputComponent variavel={cep} funcaoSetVariavel={setCep}
                                            placeholder="00.000-000" id="cep" width="100%" error={erros.cep}/>
                                    </div>
                                    <div>
                                        <label htmlFor="estado">Estado </label>
                                        <InputComponent variavel={estado} funcaoSetVariavel={setEstado}
                                            placeholder="Estado" id="estado" width="100%" error={erros.estado}/>
                                    </div>
                                </div>

                                <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                                    <div>
                                        <label htmlFor="cidade">Cidade </label>
                                        <InputComponent variavel={cidade} funcaoSetVariavel={setCidade}
                                            placeholder="Cidade" id="cidade" width="100%" error={erros.cidade}/>
                                    </div>
                                    <div>
                                        <label htmlFor="bairro">Bairro </label>
                                        <InputComponent variavel={bairro} funcaoSetVariavel={setBairro}
                                            placeholder="Bairro" id="bairro" width="100%" error={erros.bairro}/>
                                    </div>
                                </div>
                                <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                                    <div>
                                        <label htmlFor="numero">Número </label>
                                        <InputComponent variavel={numero} funcaoSetVariavel={setNumero}
                                            placeholder="Número" id="numero" width="100%" error={erros.numero}/>
                                    </div>
                                    <div>
                                        <label htmlFor="complemento">Complemento </label>
                                        <InputComponent variavel={complemento} funcaoSetVariavel={setComplemento}
                                            placeholder="Complemeto" id="complemento" width="100%" error={erros.complemento}/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.divComponentesAmbiente}>
                                <h1>2.Sobre o ambiente</h1>
                                <div className={styles.divComponentesAmbienteConjunto}>
                                    <div>
                                        <label htmlFor="tipoMoradia">Você mora em casa ou apartamento? *</label>
                                        <SelectComponent variavel={tipoMoradia} funcaoSetVariavel={setTipoMoradia}
                                            opcoes={["Apartamento", "Casa"]} width="100%" id={tipoMoradia} error={erros.tipoMoradia}/>
                                    </div>
                                    <div>
                                        <label htmlFor="posseMoradia">O imóvel é próprio ou alugado? *</label>
                                        <SelectComponent variavel={posseMoradia} funcaoSetVariavel={setPosseMoradia}
                                            opcoes={["Próprio", "Alugado"]} width="100%" id={posseMoradia} error={erros.posseMoradia}/>
                                    </div>
                                </div>
                                <div className={styles.divComponentesAmbienteConjunto}>
                                    <div>
                                        <label htmlFor="areaExternaSegura">Você possui área externa segura? *</label>
                                        <SelectComponent variavel={areaExternaSegura} funcaoSetVariavel={setAreaExternaSegura}
                                            opcoes={["Sim", "Não"]} width="100%" id={areaExternaSegura} error={erros.areaExternaSegura}/>
                                    </div>
                                    <div>
                                        <label htmlFor="outrosAnimais">Outros animais no local? *</label>
                                        <SelectComponent variavel={outrosAnimais} funcaoSetVariavel={setOutrosAnimais}
                                            opcoes={["Sim", "Não"]} width="100%" id={outrosAnimais} error={erros.outrosAnimais}/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.divComponentesExperiencia}>

                                <h1>3.Sobre sua experiência</h1>

                                <div className={styles.divComponentesExperienciaConjunto}>
                                    <label htmlFor="tevePet">Você já teve pets exóticos antes? *</label>
                                    <SelectComponent variavel={tevePet} funcaoSetVariavel={setTevePet}
                                        opcoes={["Sim", "Não"]} width="100%" id={tevePet} error={erros.tevePet}/>
                                </div>

                                <div className={styles.divComponentesExperienciaConjunto}>
                                    <label htmlFor="experienciaUsuario">Conte sobre a sua experiência, se houver:</label>
                                    <TextInputComponent variavel={experienciaUsuario} funcaoSetVariavel={setExperienciaUsuario}
                                        placeholder="'Tive um cameleão quando morava em uma apartamento...'" 
                                        id="experienciaUsuario" width="100%" height="20dvh" error={erros.experienciaUsuario}/>
                                </div>
                            </div>

                            <div className={styles.divComponentesComentario}>
                                <h1>4.Comentários</h1>
                                <label htmlFor="comentarios">Conte-nos um pouco mais sobre o seu interesse nesse pet (opcional):</label>
                                <TextInputComponent variavel={comentarios} funcaoSetVariavel={setComentarios}
                                    placeholder="..." id="comentarios" width="100%" height="20dvh" error={erros.comentarios}/>
                            </div>
                            <ButtonComponent textoBotao="Enviar Formulário" variante={1} funcaoBotao={formularioEnviarHandle}/>
                        </div>
                    </div>
                </div>
            </div>

            {
                mensagemPopUpAviso ?

                <PopUpComponent mensagem={mensagemPopUpAviso} mensagemSucesso={mensagemPopUpAvisoSucesso} />

                : ""
            }
        </div>
    );
}

export default FormularioAdocao;