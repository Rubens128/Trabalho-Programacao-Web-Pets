import styles from "./login.module.css";
import Header from "../../components/Header/header.js";
import InputComponent from "../../components/Input/input.js";
import ButtonComponent from "../../components/Button/button.js";
import LogoImage from "../../assets/logo_pets.svg";
import { loginUsuario } from "../../services/authService.js"
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { verificarUsuarioLogado } from '../../services/userService.js';

function Login(){

    const [emailInputValue, setEmailInputValue] = useState("");
    const [senhaInputValue, setSenhaInputValue] = useState("");
    const [emailInputError, setEmailInputError] = useState(false);
    const [senhaInputError, setSenhaInputError] = useState(false);
    const [error, setError] = useState("");
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

    const handleLogin = async () => {

        setEmailInputError(false);
        setSenhaInputError(false);
        setError("");

        if (emailInputValue === "" || emailInputValue === null){

            setEmailInputError(true);
            setError("Digite um email*");

        } else if(senhaInputValue === "" || senhaInputValue === null) {

            setSenhaInputError(true);
            setError("Digite uma senha*");

        } else {

            const data = await loginUsuario(emailInputValue, senhaInputValue);

            if (data === null){

                setEmailInputError(true);
                setSenhaInputError(true);
                setError("Email ou senha invalidos");

                return;
            }

            navigate("/");
        }
    }

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
                        <label for="email">E-mail</label>
                        <InputComponent variavel={emailInputValue} funcaoSetVariavel={setEmailInputValue}
                        icone={FaUser} width="100%" type="email" placeholder="seu@email.com" id="email" error={emailInputError}/>
                    </div>
                    
                    <div className={styles.divPrincipalDivLoginInput}>
                        <label for="senha">Senha</label>
                        <InputComponent variavel={senhaInputValue} funcaoSetVariavel={setSenhaInputValue}
                        icone={FaLock} width="100%" type="password" placeholder="Digite sua senha" id="senha" error={senhaInputError}/>
                        <a href="/">Esqueceu sua senha?</a>
                    </div>

                    <p style={{display: error ? "flex" : "none", justifyContent: "center", color: "#ac302c", fontFamily: "Arial, Helvetica, sans-serif"}}>{error}</p>

                    <div className={styles.divPrincipalDivBotoes}>
                        <ButtonComponent textoBotao="Entrar" icone={FaPaw} 
                        variante={1} width="100%" height="8dvh" funcaoBotao={handleLogin}/>
                        <p>ou</p>
                        <ButtonComponent textoBotao="Criar uma conta" icone={FaPaw} 
                        variante={2} width="100%" height="7dvh" funcaoBotao={() => navigate("/registrar")}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;