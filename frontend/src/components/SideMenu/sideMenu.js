import styles from "./sideMenu.module.css";
import ButtonComponent from "../Button/button";
import { IoPersonOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { PiPawPrint } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BiExit } from "react-icons/bi";
import { FaPaw } from "react-icons/fa";

function SideMenu() {

    return (

        <div className={styles.divGeral}>
            <div className={styles.divIconeTexto}>
                <IoPersonOutline /> <p>Meu Perfil</p>
            </div>
            <div className={styles.divIconeTexto}>
                <CiHeart /> <p>Meus Favoritos</p>
            </div>
            <div className={styles.divIconeTexto}>
                <PiPawPrint /> <p>Meus Pets</p>
            </div>
            <div className={styles.divIconeTexto}>
                <IoDocumentTextOutline /> <p>Minha adoções</p>
            </div>
            <div className={styles.divIconeTexto}>
                <IoSettingsOutline /> <p>Configurações</p>
            </div>
            <div className={styles.divSaida}>
                <BiExit /> <p>Sair</p>
            </div>

            <div className={styles.divCardsAdocao}>

                <div className={styles.divIconeTextoCard}>
                    <FaPaw color="#d6a559" size={30} />
                    <p>Faça a diferença</p>
                </div>
                <div className={styles.divAdocaoParagrafos}>
                    <p>Adote, transforme uma vida e ganhe um amigo eterno.</p>
                </div>
                <ButtonComponent textoBotao="Quero adotar" variante={2}/>
            </div>
        </div>
    );
}

export default SideMenu;