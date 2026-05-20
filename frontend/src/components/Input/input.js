import styles from "./input.module.css"

function InputComponent({variavel, funcaoSetVariavel, icone: Icon = null, sizeIcon = 20,
    placeholder = "", width = "50%", height = "5.5dvh", type = "text", id = null}){

    return(
        <div className={styles.divInput} style={{width: width, height: height}}>
            {Icon ? <Icon size={sizeIcon} className={styles.divInputIcon}/> : ""}
            
            <input className={styles.input} placeholder={placeholder} value={variavel} type={type}
            style={{padding: Icon ? "5px 10px 5px 40px" : "5px 10px"}} id={id}
            onChange={funcaoSetVariavel ? (e) => funcaoSetVariavel(e.currentTarget.value) : (e) => {return;}}>
            </input>

        </div>

    );
}

export default InputComponent;