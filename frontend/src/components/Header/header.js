import styles from './header.module.css';
import LogoPets from '../Logo/logo.js';
import PeixesImg from '../../assets/peixes.png';
import { PiUserCircleLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { useState } from 'react';

function Header({ usuario = null }){

    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <div className={styles.header}>
            <LogoPets/>
            <div className={styles.headerLinks}>
                <a href='/'>Início</a>
                <a href='/listaPets'>Adotar Pet</a>
                <a href={usuario !== null ? '/formularioAdicao' : "/login"}>Adicionar Pet</a>
                <a href='/'>FAQ</a>
                {usuario?.tipo === "adm" ? <a href='/admGerenciar'>Painel Administrador</a> : "" }
            </div>
            <div className={styles.headerIcons}>
                <CiSearch color='white' size={40}/>
                <div className={styles.headerIconsPerfil}>

                    {
                        usuario !== null ?
                            
                            <div className={styles.headerIconsPerfilImage} onClick={() => setMenuAberto(!menuAberto)}> 
                                <img src={PeixesImg} alt="imagem de perfil"/>
                            </div>

                        :
                            <PiUserCircleLight color='white' size={40} onClick={() => setMenuAberto(!menuAberto)}/>

                    }

                    {
                        usuario !== null ?
                        
                        <div className={styles.headerIconsPerfilMenu} style={{display: menuAberto ? "flex" : "none"}}>
                            <a href='/perfil'>Perfil</a>
                            <a href='/login'>Sair</a>
                        </div>

                        :

                        <div className={styles.headerIconsPerfilMenu} style={{display: menuAberto ? "flex" : "none"}}>
                            <a href='/login'>Login</a>
                            <a href='/registrar'>Registrar</a>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;