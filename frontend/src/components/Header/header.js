import styles from './header.module.css';
import LogoPets from '../Logo/logo.js';
import { PiUserCircleLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";

function Header(){

    return (
        <div className={styles.header}>
            <LogoPets/>
            <div className={styles.headerLinks}>
                <a href='/'>Início</a>
                <a href='/listaPets'>Adotar Pet</a>
                <a href='/formularioAdicao'>Adicionar Pet</a>
                <a href='/'>FAQ</a>
            </div>
            <div className={styles.headerIcons}>
                <CiSearch color='white' size={40}/>
                <PiUserCircleLight color='white' size={40}/>
            </div>
        </div>
    );
}

export default Header;