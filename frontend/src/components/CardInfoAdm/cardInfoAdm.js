import styles from "./cardInfoAdm.module.css";

function CardInfoAdmComponent({nomeDado, quantidade, porcentagem, icone: Icon, 
                                sizeIcone, porcentagemPositiva = true, width = "22.5%"}){

    return (
        <div className={styles.divGeral} style={{width: width}}>
            <div className={styles.divGeralText}>
                <p>{nomeDado}</p>
                <h1>{quantidade}</h1>
                <p style={{ color: porcentagemPositiva ? "#389d2f" : "#ac302c"}}>{porcentagem}</p>
            </div>
            <div className={styles.divGeralIcone}>
                <Icon size={sizeIcone}/>
            </div>
        </div>
    );
}

export default CardInfoAdmComponent;