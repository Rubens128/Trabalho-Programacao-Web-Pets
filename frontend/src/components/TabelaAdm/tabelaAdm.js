import styles from "./tabelaAdm.module.css";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";

function TabelaAdmComponent({ tabelaExpandida, numTabelaExpandida, listaDados = [], 
        tabelaParaUsuario = true, funcaoDeletar = () => "", funcaoEditar = () => ""}) {

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

                        {
                            tabelaParaUsuario ? "" :
                            
                            <th style={{ width: tabelaExpandida === numTabelaExpandida ? "15%" : "15%" }}>
                                {"Descrição"}
                            </th>
                        }

                        {
                            tabelaParaUsuario ? 
                            
                            <th className={styles.colAcoes}
                                style={{ width: tabelaExpandida === numTabelaExpandida ? "15%" : "15%" }}>
                                    {"Ações"}
                            </th>
                            
                            :
                            
                            <th className={styles.colAcoes}
                                style={{ width: tabelaExpandida === numTabelaExpandida ? "10%" : "10%" }}>
                                    {"Ações"}
                            </th>
                        }
                        
                        
                        </tr>
                </thead>

                <tbody>

                    {listaDados?.map((dado, index) => {
                        return (
                            <tr key={index}>
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
                                        <td className={styles.colTipo} style={{ width: "12.5%" }}>{
                                            tabelaParaUsuario ? dado.data : dado.adicionadoEm}</td>
                                        : ""
                                }

                                <td style={{ width: tabelaExpandida === numTabelaExpandida ? "10%" : "15%" }}>
                                    {tabelaParaUsuario ? dado.petsAdicionado : dado.status}
                                </td>

                                <td style={{ width: tabelaExpandida === numTabelaExpandida ? "10%" : "15%" }}>
                                    {tabelaParaUsuario ? dado.petsAdotados : dado.local}
                                </td>

                                {
                                    tabelaParaUsuario ? "" :
                                    <td style={{ width: tabelaExpandida === numTabelaExpandida ? "15%" : "15%" }}>
                                        {dado.descricao}
                                    </td>
                                }

                                {
                                    tabelaParaUsuario ?
                                        <td className={styles.colAcoes}
                                            style={{ width: tabelaExpandida === numTabelaExpandida ? "15%" : "15%" }}>
                                            {
                                                tabelaExpandida === numTabelaExpandida ?
                                                    <div>
                                                        <button style={{ backgroundColor: "#2c46ac"}}
                                                        onClick={() => funcaoEditar(dado)}><MdAdminPanelSettings size={18} />Permissões</button>
                                                        <button style={{ backgroundColor: "#ac302c" }}><FaTrash size={15} 
                                                        onClick={() => funcaoDeletar(dado.nome)}/>Deletar</button>
                                                    </div>
                                                    :
                                                    <div className={styles.colAcoes}>
                                                        <button style={{ backgroundColor: "#2c46ac" }}
                                                        onClick={() => funcaoEditar(dado)}><MdAdminPanelSettings size={18} /></button>
                                                        <button style={{ backgroundColor: "#ac302c" }}
                                                        onClick={() => funcaoDeletar(dado.nome)}><FaTrash size={15} /></button>
                                                    </div>
                                            }
                                        </td>
                                    :  
                                        <td className={styles.colAcoes}
                                            style={{ width: tabelaExpandida === numTabelaExpandida ? "10%" : "10%" }}>
                                            {
                                                tabelaExpandida === numTabelaExpandida ?
                                                    <div>
                                                        <button style={{ backgroundColor: "#ac302c" }} onClick={() => funcaoDeletar(dado.id)}>
                                                            <FaTrash size={15} />Deletar
                                                        </button>
                                                    </div>
                                                    :
                                                    <div className={styles.colAcoes}>
                                                        <button style={{ backgroundColor: "#ac302c" }} onClick={() => funcaoDeletar(dado.id)}>
                                                            <FaTrash size={15} />
                                                        </button>
                                                    </div>
                                            }
                                        </td>
                                }
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaAdmComponent;