import styles from "./textInput.module.css"

function TextInputComponent({variavel, funcaoSetVariavel, placeholder = "", 
    width = "50%", height = "5.5dvh", id = null}){

    return(

        <textarea placeholder={placeholder} onChange={(e) => funcaoSetVariavel(e.target.value)}
        value={variavel} id={id} style={{width: width, height: height}} className={styles.textarea}></textarea>
    );
}

export default TextInputComponent;