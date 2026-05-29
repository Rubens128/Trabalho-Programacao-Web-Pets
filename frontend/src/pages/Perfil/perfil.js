import styles from "./perfil.module.css";
import Header from "../../components/Header/header.js";
import SideMenu from "../../components/SideMenu/sideMenu.js";
import InputComponent from "../../components/Input/input.js";
import ButtonComponent from "../../components/Button/button.js";
import LogoImage from "../../assets/logo_pets.svg";

function Perfil(){

    return(

        <div>
            <Header/>
            <div className={styles.divComponentes}>
                <SideMenu/>
                <h1 style={{color: "white", padding: "30px"}}>Meu Perfil</h1>
                <div className>
                    <div>
                        <div>
                            <div>
                                  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;