import styles from "./popUp.module.css";
import ButtonComponent from "../Button/button";


function PopUpComponent({mensagem, width = "30dvw", height = "30dvh", mensagemSucesso = true, 
                            popUpConfirmacao=false, funcaoConfirmar= () => "", funcaoCancelar = () => ""}){
    return(
        <div className={styles.div} style={{width: width, height: height, color: mensagemSucesso ? "#2cac2e" : "#ac302c"}}>
            <p>{mensagem}</p>
            {
                popUpConfirmacao ?
                
                <div className={styles.divBotoes}>
                    <ButtonComponent variante={1} textoBotao="Cancelar" funcaoBotao={funcaoCancelar} />
                    <ButtonComponent variante={2} textoBotao="Confirmar" funcaoBotao={funcaoConfirmar} />
                </div>
                
                : ""
            }
        </div>
    );
}

export default PopUpComponent;