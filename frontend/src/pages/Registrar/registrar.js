import styles from "./registrar.module.css";
import Header from "../../components/Header/header.js";
import InputComponent from "../../components/Input/input.js";
import ButtonComponent from "../../components/Button/button.js";
import LogoImage from "../../assets/logo_pets.svg";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { verificarUsuarioLogado } from '../../services/authService.js';

function Registrar(){

    const [emailInputValue, setEmailInputValue] = useState("");
    const [nomeInputValue, setNomeInputValue] = useState("");
    const [senhaInputValue, setSenhaInputValue] = useState("");
    const [confirmarSenhaInputValue, setConfirmarSenhaInputValue] = useState("");
    const [ usuario, setUsuario ] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        
        async function verificarUsuario() {
        
        const retornoUsuario = await verificarUsuarioLogado();
        
        if (retornoUsuario) navigate("/");

        setUsuario(retornoUsuario);
        }
        
        verificarUsuario();

    }, [navigate]);

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
                            icone={FaUser} width="100%" type="email" placeholder="seu@email.com" id="email"/>
                        </div>
                        
                        <div className={styles.divPrincipalDivLoginRowInput}>
                            <label for="nome">Nome</label>
                            <InputComponent variavel={nomeInputValue} funcaoSetVariavel={setNomeInputValue}
                            icone={MdDriveFileRenameOutline}  sizeIcon={22} width="100%" type="text" 
                            placeholder="Digite seu nome" id="nome"/>
                        </div>
                    </div>

                    <div className={styles.divPrincipalDivLoginRow}>
                        <div className={styles.divPrincipalDivLoginRowInput}>
                            <label for="senha">Senha</label>
                            <InputComponent variavel={senhaInputValue} funcaoSetVariavel={setSenhaInputValue}
                            icone={FaLock} width="100%" type="password" placeholder="Digite sua senha" id="senha"/>
                        </div>

                        <div className={styles.divPrincipalDivLoginRowInput}>
                            <label for="confirmarSenha">Confirmar Senha</label>
                            <InputComponent variavel={confirmarSenhaInputValue} funcaoSetVariavel={setConfirmarSenhaInputValue}
                            icone={FaLock} width="100%" type="password" placeholder="Digite novamente sua senha" id="confirmarSenha"/>
                        </div>
                    </div>

                    <div className={styles.divPrincipalDivBotoes}>
                        <ButtonComponent textoBotao="Criar Conta" icone={FaPaw} variante={1} width="50%" height="8dvh"/>
                        <p>ou</p>
                        <ButtonComponent textoBotao="Já tenho uma Conta" icone={FaPaw} variante={2} width="50%" height="7dvh"/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Registrar;