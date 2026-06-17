import styles from "./checkbox.module.css";
import { FaCheck } from "react-icons/fa6";

function CheckBoxComponent({texto, variavel, setFuncaoVariavel, index}){
    
    return (
        <label className={styles.label}>
            <input type="checkbox" onChange={(e) => {
                
                if(index === "todos") return;

                let novosDados = { ...variavel, [index]: e.target.checked };

                if(!Object.keys(novosDados).every((key) => key !== "todos" ? !novosDados[key] : true)){

                    novosDados = { ...novosDados, todos: false };

                } else{

                    novosDados = { ...novosDados, todos: true };
                }

                setFuncaoVariavel(novosDados);
            
            }}
            checked={variavel[index]} key={index}/>
            <span className={ variavel[index] ? styles.checkBoxStyleOn : styles.checkBoxStyleOff}>
                {variavel[index] ? <FaCheck /> : ""}
            </span>
            {texto}
        </label>
    );
}

export default CheckBoxComponent;