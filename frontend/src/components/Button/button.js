import styles from "./button.module.css"

function ButtonComponent({variante = 1, icone: Icon = null, iconeSize = 18, 
        textoBotao = "botao", funcaoBotao = (e) => {return;}, width = "", height = "", iconeNaFrente = false}){

    return (
        <button className={variante === 1 ? styles.botaoVariante1 : styles.botaoVariante2}
            onClick={funcaoBotao} style={{width: width, height: height, 
                flexDirection: iconeNaFrente ? "row-reverse" : "row"}}>
            {Icon ? <Icon size={iconeSize}/> : ""}
            {textoBotao}
        </button>
    );
}

export default ButtonComponent;