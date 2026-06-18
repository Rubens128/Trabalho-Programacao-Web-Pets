import styles from "./registrar.module.css";
import Header from "../../components/Header/header.js";
import InputComponent from "../../components/Input/input.js";
import ButtonComponent from "../../components/Button/button.js";
import LogoImage from "../../assets/logo_pets.svg";
import PopUpComponent from "../../components/popUp/popUp.js";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { verificarUsuarioLogado } from '../../services/userService.js';
import { AdicionarUsuario } from "../../services/userService.js";

function Registrar(){

    const [emailInputValue, setEmailInputValue] = useState("");
    const [nomeInputValue, setNomeInputValue] = useState("");
    const [senhaInputValue, setSenhaInputValue] = useState("");
    const [confirmarSenhaInputValue, setConfirmarSenhaInputValue] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [errosInput, setErrosInput] = useState({
        email: false,
        nome: false,
        senha: false,
        mensagem: "",
    });
    const [popUpConfimacaoAtivo, setPopUpConfimacaoAtivo] = useState(false);
    const [mensagemPopUpAviso, setMensagemPopUpAviso] = useState("");
    const [mensagemPopUpAvisoSucesso, setMensagemPopUpAvisoSucesso] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        
        async function verificarUsuario() {
        
        const retornoUsuario = await verificarUsuarioLogado();
        
        if (retornoUsuario) navigate("/");

            setUsuario(retornoUsuario);
        }
        
        verificarUsuario();

    }, [navigate]);

    async function registrarUsuarioHandle() {
        
        const dadosUsuario = {
            nome: nomeInputValue,
            email: emailInputValue,
            senha: senhaInputValue,
            confirmarSenha: confirmarSenhaInputValue,
        }
        
        const resposta = await AdicionarUsuario(dadosUsuario);

        console.log(resposta);

        if(resposta === null){

            setMensagemPopUpAvisoSucesso(false);
            setMensagemPopUpAviso("Erro ao criar a conta.")

            setTimeout(() =>{
                setMensagemPopUpAviso("");
            }, 3000);

            return;
        }

        if(!Object.keys(resposta).every((key) => !resposta[key])){

            setErrosInput(resposta);

            return;
        }

        setMensagemPopUpAvisoSucesso(true);
        setMensagemPopUpAviso("Sucesso ao criar a contar.");

        setTimeout(() =>{
            setMensagemPopUpAviso("");
            navigate("/login");
        }, 3000);

    }

    return (
        <div>
            <Header />
            <div className={styles.divPrincipal}>
                <div className={styles.divPrincipalLogo}>
                    <img src={LogoImage} alt="Imagem da Logo do site"/>
                    <h1><span style={{color: "#d6a559"}}>Exo</span>Pets</h1>
                    <p>Conexão exótica | Amor que Transforma </p>
                </div>
                <div className={styles.divPrincipalDivLogin}>
                    
                    <div className={styles.divPrincipalDivLoginTitulo}>
                        <h1>Bem-Vindo(a)!</h1>
                        <p>Crie sua conta para continuar</p>
                    </div>

                    <div className={styles.divPrincipalDivLoginRow}>
                        <div className={styles.divPrincipalDivLoginRowInput}>
                            <label for="email">E-mail</label>
                            <InputComponent variavel={emailInputValue} funcaoSetVariavel={setEmailInputValue}
                            icone={FaUser} width="100%" type="email" placeholder="seu@email.com" id="email" 
                            error={errosInput.email}/>
                        </div>
                        
                        <div className={styles.divPrincipalDivLoginRowInput}>
                            <label for="nome">Nome</label>
                            <InputComponent variavel={nomeInputValue} funcaoSetVariavel={setNomeInputValue}
                            icone={MdDriveFileRenameOutline}  sizeIcon={22} width="100%" type="text" 
                            placeholder="Digite seu nome" id="nome" error={errosInput.nome}/>
                        </div>
                    </div>

                    <div className={styles.divPrincipalDivLoginRow}>
                        <div className={styles.divPrincipalDivLoginRowInput}>
                            <label for="senha">Senha</label>
                            <InputComponent variavel={senhaInputValue} funcaoSetVariavel={setSenhaInputValue}
                            icone={FaLock} width="100%" type="password" placeholder="Digite sua senha" id="senha"
                            error={errosInput.senha}/>
                        </div>

                        <div className={styles.divPrincipalDivLoginRowInput}>
                            <label for="confirmarSenha">Confirmar Senha</label>
                            <InputComponent variavel={confirmarSenhaInputValue} funcaoSetVariavel={setConfirmarSenhaInputValue}
                            icone={FaLock} width="100%" type="password" placeholder="Digite novamente sua senha" 
                            id="confirmarSenha" error={errosInput.senha}/>
                        </div>
                    </div>

                    {errosInput.mensagem ? <p style={{alignSelf: "center", opacity: "0.8"}}>{errosInput.mensagem}</p> : ""}

                    <div className={styles.divPrincipalDivBotoes}>
                        <ButtonComponent textoBotao="Criar Conta" icone={FaPaw} variante={1} 
                            width="50%" height="8dvh" funcaoBotao={registrarUsuarioHandle}/>
                        <p>ou</p>
                        <ButtonComponent textoBotao="Já tenho uma Conta" icone={FaPaw} variante={2} 
                            width="50%" height="7dvh" funcaoBotao={() => navigate("/login")}/>
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

export default Registrar;