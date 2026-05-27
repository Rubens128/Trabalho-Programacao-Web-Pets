import styles from "./select.module.css";

function SelectComponent({ variavel, funcaoSetVariavel, opcoes,
    width = "50%", height = "5.5dvh", id = null }) {

    return (

        <select style={{ width: width, height: height }}
            onChange={(e) => funcaoSetVariavel(e.target.value)} value={variavel}
            className={styles.select}>
            <option value="">Selecione uma opção:</option>
            {opcoes.map((opcao) => <option value={opcao}>{opcao}</option>)}
        </select>
    );
}

export default SelectComponent;