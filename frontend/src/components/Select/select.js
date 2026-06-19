import styles from "./select.module.css";

function SelectComponent({ variavel, funcaoSetVariavel, opcoes,
    width = "50%", height = "5.5dvh", id = null, error = false, ref = "", nomeRef = "" }) {

    return (

        <select style={{ width: width, height: height,
                background: error ? "none" : "", 
                border: error ? "2px solid #ac302c" : ""
            }}
            onChange={(e) => funcaoSetVariavel(e.target.value)} value={variavel}
            className={styles.select}
            ref={(elemento) => ref && ref.current ? ref.current[nomeRef] = elemento : ""}
        >

            <option value="">Selecione uma opção:</option>
            {opcoes.map((opcao) => <option value={opcao}>{opcao}</option>)}
            
        </select>
    );
}

export default SelectComponent;