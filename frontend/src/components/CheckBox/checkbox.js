import styles from "./checkbox.module.css";
import { FaCheck } from "react-icons/fa6";

function CheckBoxComponent({texto, variavel, setFuncaoVariavel, index}){
    
    return (
        <label className={styles.label}>
            <input type="checkbox" onChange={(e) => setFuncaoVariavel((dados) => ({ ...dados, [index]: e.target.checked}))}
            checked={variavel[index]} key={index}/>
            <span className={ variavel[index] ? styles.checkBoxStyleOn : styles.checkBoxStyleOff}>
                {variavel[index] ? <FaCheck /> : ""}
            </span>
            {texto}
        </label>
    );
}

export default CheckBoxComponent;