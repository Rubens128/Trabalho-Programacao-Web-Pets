import styles from "./tabelaAdm.module.css";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";

function TabelaAdmComponent({ tabelaExpandida, numTabelaExpandida, listaDados = [], tabelaParaUsuario = true}) {

    return (
        <div className={styles.divScroll}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ width: tabelaExpandida === numTabelaExpandida ? "15%" : "17.5%" }}>Nome</th>

                        <th style={{ width: tabelaExpandida === numTabelaExpandida ? "15%" : "17.5%" }}>
                            {tabelaParaUsuario ? "email" : "Espécie"}
                        </th>

                        <th style={{ width: tabelaExpandida === numTabelaExpandida ? "10%" : "10%" }}>
                            {tabelaParaUsuario ? "Tipo": "Data Nascimento"}
                        </th>

                        {
                            tabelaExpandida === numTabelaExpandida ?
                                <th className={styles.colTipo} style={{ width: "12.5%" }}>Data Registro</th>
                                : ""
                        }

                        <th style={{ width: tabelaExpandida === numTabelaExpandida ? "10%" : "15%" }}>
                            {tabelaParaUsuario ? "Pets Adicionados" : "Status"}
                        </th>

                        <th style={{ width: tabelaExpandida === numTabelaExpandida ? "10%" : "15%" }}>
                            {tabelaParaUsuario ? "Pets Adotados" : "Local"}
                        </th>

                        <th className={styles.colAcoes}
                            style={{ width: tabelaExpandida === numTabelaExpandida ? "25%" : "25%" }}>Ações</th>
                    </tr>
                </thead>

                <tbody>

                    {listaDados?.map((dado) => {
                        return (
                            <tr>
                                <td style={{ width: tabelaExpandida === numTabelaExpandida ? "15%" : "17.5%" }}>
                                    {dado.nome}
                                </td>

                                <td style={{ width: tabelaExpandida === numTabelaExpandida ? "15%" : "17.5%" }}>
                                    { tabelaParaUsuario ? dado.email : dado.especie}
                                </td>

                                <td style={{ width: tabelaExpandida === numTabelaExpandida ? "10%" : "10%" }}>
                                    {tabelaParaUsuario ? dado.tipo : dado.dataNasc}
                                </td>

                                {
                                    tabelaExpandida === numTabelaExpandida ?
                                        <td className={styles.colTipo} style={{ width: "12.5%" }}>{dado.adicionadoEm}</td>
                                        : ""
                                }

                                <td style={{ width: tabelaExpandida === numTabelaExpandida ? "10%" : "15%" }}>
                                    {tabelaParaUsuario ? dado.petsAdicionado : dado.status}
                                </td>

                                <td style={{ width: tabelaExpandida === numTabelaExpandida ? "10%" : "15%" }}>
                                    {tabelaParaUsuario ? dado.petsAdotados : dado.local}
                                </td>

                                <td className={styles.colAcoes}
                                    style={{ width: tabelaExpandida === numTabelaExpandida ? "25%" : "25%" }}>
                                    {
                                        tabelaExpandida === numTabelaExpandida ?
                                            <div>
                                                <button style={{ backgroundColor: "#2c46ac"}}><MdAdminPanelSettings size={18} />Permissões</button>
                                                <button style={{ backgroundColor: "#aaac2c" }}><MdEdit size={16} />Editar</button>
                                                <button style={{ backgroundColor: "#ac302c" }}><FaTrash size={15} />Deletar</button>
                                            </div>
                                            :
                                            <div className={styles.colAcoes}>
                                                <button style={{ backgroundColor: "#2c46ac" }}><MdAdminPanelSettings size={18} /></button>
                                                <button style={{ backgroundColor: "#aaac2c" }}><MdEdit size={16} /></button>
                                                <button style={{ backgroundColor: "#ac302c" }}><FaTrash size={15} /></button>
                                            </div>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaAdmComponent;