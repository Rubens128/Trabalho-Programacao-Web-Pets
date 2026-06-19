import styles from "./textInput.module.css"

function TextInputComponent({variavel, funcaoSetVariavel, placeholder = "", 
    width = "50%", height = "5.5dvh", id = null, error = false, ref = "", nomeRef = ""}){

    return(

        <textarea placeholder={placeholder} onChange={(e) => funcaoSetVariavel(e.target.value)}
        value={variavel} id={id} style={{width: width, height: height,
            background: error ? "none" : "", 
            border: error ? "2px solid #ac302c" : ""
        }} className={styles.textarea} 
        ref={(elemento) => ref && ref.current ? ref.current[nomeRef] = elemento : ""}></textarea>
    );
}

export default TextInputComponent;