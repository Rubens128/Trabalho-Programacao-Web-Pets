import styles from "./formularioAdocao.module.css";
import Header from "../../components/Header/header";
import InputComponent from "../../components/Input/input";
import ButtonComponent from "../../components/Button/button";
import SelectComponent from "../../components/Select/select";
import TextInputComponent from "../../components/TextInput/textInput";
import AveImg from "../../assets/aves.png";
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

function FormularioAdocao({ gender = "macho" }) {

    const [nomeCompleto, setNomeCompleto] = useState("");
    const [telefone, setTelefone] = useState(null);
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState(null);
    const [complemento, setComplemento] = useState("");
    const [residencia, setResidencia] = useState("");
    const [posseResidencia, setPosseResidencia] = useState("");
    const [areaExterna, setAreaExterna] = useState(null);
    const [outrosAnimais, setOutrosAnimais] = useState(null);
    const [tevePetExo, setTevePetExo] = useState(null);
    const [experenciaUsuario, setExperienciaUsuario] = useState("");

    return (

        <div>
            <Header />
            <div className={styles.divPrincipal}>

                <div className={styles.divComponentes}>
                    <h1>Conheça seu novo amigo!</h1>
                    <div className={styles.divComponentesPet}>
                        <div className={styles.divComponentesPetSpace}>
                            <img src={AveImg} alt="Imagem do Pet Selecionado" />
                            <div className={styles.divComponentesPetInfos}>
                                <h1>Gecko Leopardo</h1>
                                <p><FaRegUser color="#d6a559" size={23} />Nome: Bolt</p>
                                <p><FaPaw color="#d6a559" size={23} />Espécie: Eublepharis macularius</p>
                                <p><CiCalendar color="#d6a559" size={23} />Idade: 1 ano</p>
                                <p>{gender === "macho" ? <BsGenderMale color="#d6a559" size={23} /> : <BsGenderFemale color="#d6a559" size={23} />}Sexo: Masculino</p>
                                <p><IoMdPin color="#d6a559" size={23} />Origem: </p>
                                <p><LuBrain color="#d6a559" size={23} />Temperamento: Dócil e curioso</p>
                                <p><GiWeight color="#d6a559" size={23} />Peso Atual: 55g</p>
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
                            <div className={styles.divComponentesPetAdicionalAviso}>
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

                            <div className={styles.divComponentesPetAdicionalAjuda}>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <FaRegClock color="#d6a559" size={30}/>
                                    <h1 style={{ color: "#d6a559" }}>Precisa de Ajuda?</h1>
                                </div>
                                <div className={styles.divComponentesPetAdicionalParagrafos}>
                                    <h1>Fale com nossa equipes especializada e tire todas as suas duvidas antes de finalizar a sua adoção</h1>
                                </div>
                                <ButtonComponent textoBotao="Falar com especialista" variante={1} icone={PiHeadsetBold}/>
                            </div>

                        </div>

                        <div className={styles.divComponentesConjuntoInscricao}>
                            <h1>1.Sobre você</h1>
                            <div>
                                <label for="nomeCompleto" >Nome Completo *</label>
                                <InputComponent variavel={nomeCompleto} funcaoSetVariavel={setNomeCompleto}
                                    placeholder="Digite seu nome completo" id="nomeCompleto" width="100%" />
                            </div>

                            <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                                <div>
                                    <label for="cpf">CPF *</label>
                                    <InputComponent variavel={cpf} funcaoSetVariavel={setCpf}
                                        placeholder="000.000.000-00" id="cpf" width="100%" />
                                </div>
                                <div>
                                    <label for="telefone">Telefone / WhatsApp *</label>
                                    <InputComponent variavel={telefone} funcaoSetVariavel={setTelefone}
                                        placeholder="(00) 00000-0000" id="telefone" width="100%" />
                                </div>
                            </div>
                            <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                                <div>
                                    <label for="email">E-mail *</label>
                                    <InputComponent variavel={email} funcaoSetVariavel={setEmail}
                                        placeholder="Digite seu email" id="email" width="100%" />
                                </div>
                                <div>
                                    <label for="dataNascimento">Data Nascimento *</label>
                                    <InputComponent variavel={dataNascimento} funcaoSetVariavel={setDataNascimento}
                                        placeholder="DD/MM/AAAA" id="dataNascimento" width="100%" />
                                </div>
                            </div>

                            <div className={styles.divComponentesConjuntoInscricaoFormularioEndereco}>
                                <h2>Endereço</h2>

                                <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                                    <div>
                                        <label for="cep">CEP </label>
                                        <InputComponent variavel={cep} funcaoSetVariavel={setCep}
                                            placeholder="00.000-000" id="cep" width="100%" />
                                    </div>
                                    <div>
                                        <label for="estado">Estado </label>
                                        <InputComponent variavel={estado} funcaoSetVariavel={setEstado}
                                            placeholder="Estado" id="estado" width="100%" />
                                    </div>
                                </div>

                                <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                                    <div>
                                        <label for="cidade">Cidade </label>
                                        <InputComponent variavel={cidade} funcaoSetVariavel={setCidade}
                                            placeholder="Cidade" id="cidade" width="100%" />
                                    </div>
                                    <div>
                                        <label for="bairro">Bairro </label>
                                        <InputComponent variavel={bairro} funcaoSetVariavel={setBairro}
                                            placeholder="Bairro" id="bairro" width="100%" />
                                    </div>
                                </div>
                                <div className={styles.divComponentesConjuntoInscricaoFormularioCampos}>
                                    <div>
                                        <label for="numero">Número </label>
                                        <InputComponent variavel={numero} funcaoSetVariavel={setNumero}
                                            placeholder="Número" id="numero" width="100%" />
                                    </div>
                                    <div>
                                        <label for="complemento">Complemento </label>
                                        <InputComponent variavel={complemento} funcaoSetVariavel={setComplemento}
                                            placeholder="Complemeto" id="complemento" width="100%" />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.divComponentesAmbiente}>
                                <h1>2. Sobre o ambiente</h1>
                                <div className={styles.divComponentesAmbienteConjunto}>
                                    <div>
                                        <label for="residencia">Você mora em casa ou apartamento? *</label>
                                        <SelectComponent variavel={residencia} funcaoSetVariavel={setResidencia}
                                            opcoes={["Apartamento", "Casa"]} width="100%" id={residencia} />
                                    </div>
                                    <div>
                                        <label for="posseResidencia">O imóvel é próprio ou alugado? *</label>
                                        <SelectComponent variavel={posseResidencia} funcaoSetVariavel={setPosseResidencia}
                                            opcoes={["Próprio", "Alugado"]} width="100%" id={posseResidencia} />
                                    </div>
                                </div>
                                <div className={styles.divComponentesAmbienteConjunto}>
                                    <div>
                                        <label for="areaExterna">Você possui área externa segura? *</label>
                                        <SelectComponent variavel={areaExterna} funcaoSetVariavel={setAreaExterna}
                                            opcoes={["Sim", "Não"]} width="100%" id={areaExterna} />
                                    </div>
                                    <div>
                                        <label for="outrosAnimais">Outros animais no local? *</label>
                                        <SelectComponent variavel={outrosAnimais} funcaoSetVariavel={setOutrosAnimais}
                                            opcoes={["Sim", "Não"]} width="100%" id={outrosAnimais} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.divComponentesExperiencia}>

                                <h1>3. Sobre sua experiência</h1>

                                <div className={styles.divComponentesExperienciaConjunto}>
                                    <label>Você já teve pets exóticos antes? *</label>
                                    <SelectComponent variavel={tevePetExo} funcaoSetVariavel={setTevePetExo}
                                        opcoes={["Sim", "Não"]} width="100%" id={tevePetExo} />
                                </div>

                                <div className={styles.divComponentesExperienciaConjunto}>
                                    <label>Conte sobre a sua experiência, se houver:</label>
                                    <TextInputComponent variavel={experenciaUsuario} funcaoSetVariavel={setExperienciaUsuario}
                                        placeholder="'Tive um cameleão quando morava em uma apartamento...'" id="experienciaUsuario" width="100%" height="20dvh" />
                                </div>
                            </div>

                            <div className={styles.divComponentesComentario}>
                                <h1>4. Comentários</h1>
                                <label>Conte-nos um pouco mais sobre o seu interesse nesse pet (opcional):</label>
                                <TextInputComponent variavel={experenciaUsuario} funcaoSetVariavel={setExperienciaUsuario}
                                    placeholder="..." id="experienciaUsuario" width="100%" height="20dvh" />
                            </div>
                            <ButtonComponent textoBotao="Enviar Formulário" variante={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormularioAdocao;