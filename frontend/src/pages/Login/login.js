import styles from "./login.module.css";
import Header from "../../components/Header/header.js";
import InputComponent from "../../components/Input/input.js";
import ButtonComponent from "../../components/Button/button.js";
import LogoImage from "../../assets/logo_pets.svg";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";

function Login(){

    const [emailInputValue, setEmailInputValue] = useState("");
    const [senhaInputValue, setSenhaInputValue] = useState("");

    return (
        <div>
            <Header/>
            <div className={styles.divPrincipal}>
                <div className={styles.divPrincipalLogo}>
                    <img src={LogoImage} alt="Imagem da Logo do site"/>
                    <h1><span style={{color: "#d6a559"}}>Exo</span>Pets</h1>
                    <p>Conexão exótica | Amor que Transforma </p>
                </div>
                <div className={styles.divPrincipalDivLogin}>
                    
                    <div className={styles.divPrincipalDivLoginTitulo}>
                        <h1>Bem-Vindo(a) de volta!</h1>
                        <p>Faça login para continuar</p>
                    </div>

                    <div className={styles.divPrincipalDivLoginInput}>
                        <label>E-mail</label>
                        <InputComponent variavel={emailInputValue} funcaoSetVariavel={setEmailInputValue}
                        icone={FaUser} width="100%" type="email" placeholder="seu@email.com"/>
                    </div>
                    
                    <div className={styles.divPrincipalDivLoginInput}>
                        <label for="email">Senha</label>
                        <InputComponent variavel={senhaInputValue} funcaoSetVariavel={setSenhaInputValue}
                        icone={FaLock} width="100%" type="password" placeholder="Digite sua senha" id="email"/>
                        <a href="/">Esqueceu sua senha?</a>
                    </div>

                    <div className={styles.divPrincipalDivBotoes}>
                        <ButtonComponent textoBotao="Entrar" icone={FaPaw} variante={1} width="100%" height="8dvh"/>
                        <p>ou</p>
                        <ButtonComponent textoBotao="Criar uma conta" icone={FaPaw} variante={2} width="100%" height="7dvh"/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Login;