import styles from "./logo.module.css"
import imagemLogo from "../../assets/logo_pets.svg"

function Logo(){
    return(
        <div className={styles.divLogo}>
            <img src={imagemLogo} alt="imagem da logo" className={styles.divLogoImagem}></img>
            <div className={styles.divLogoTextos}>
                <h1><span style={{color: "#d6a559"}}>Exo</span>Pets</h1>
                <p>Conexão exótica | Amor que Transforma </p>
            </div>
        </div>
    );
}

export default Logo;