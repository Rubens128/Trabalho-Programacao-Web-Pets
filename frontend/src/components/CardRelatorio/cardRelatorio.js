import styles from "./cardRelatorio.module.css";
import ButtonComponent from "../../components/Button/button";
import MamiferoImage from "../../assets/mamifero.png";

function CardRelatorioComponent({ relatorio, funcaoDeletarRelatorio = () => {}, funcaoEditarRelatorio = () => {} }) {

    return (

        <div className={styles.divGeralRelatoriosCard} key={relatorio.id}>

            <div className={styles.divGeralRelatoriosCardTopicos}>

                <div className={styles.divGeralRelatoriosCardTopicosImagemDiv}>
                    <img src={MamiferoImage} alt="Mamífero" />
                </div>

                <div className={styles.divGeralRelatoriosCardTopicosTexto}>
                    <div>
                        <h1>Nome Atual Dono: </h1>
                        <p>{relatorio.nomeAntigoDono }</p>
                    </div>

                    <div>
                        <h1>Nome Futuro Dono: </h1>
                        <p>{relatorio.nomeNovoDono}</p>
                    </div>

                    <div>
                        <h1>Nome do pet: </h1>
                        <p>{relatorio.nomePet}</p>
                    </div>
                </div>

                <div className={styles.divGeralRelatoriosCardTopicosTexto}>
                    <div>
                        <h1>Data do pedido: </h1>
                        <p>{relatorio.dataPedido}</p>
                    </div>

                    <div>
                        <h1>Status: </h1>
                        <p>{relatorio.status}</p>
                    </div>
                </div>
            </div>

            <div className={styles.divGeralRelatoriosCardTopicos}>

                <div className={styles.divGeralRelatoriosCardTopicosTexto} style={{ justifyContent: "start" }}>

                    <div>
                        <h1>Comentário: </h1>
                        <p>{relatorio.comentarios}</p>
                    </div>

                </div>

                <div className={styles.divGeralRelatoriosCardTopicosTexto} style={{ justifyContent: "start" }}>

                    <div>
                        <h1>Experiência: </h1>
                        <p>{relatorio.experiencia?.experienciaAnterior}</p>
                    </div>

                </div>

                <div className={styles.divGeralRelatoriosCardTopicosBotoes}>

                    <ButtonComponent variante={1} textoBotao="Deletar" width="98%" 
                        funcaoBotao={() => funcaoDeletarRelatorio(relatorio.id)} />
                    <ButtonComponent variante={2} textoBotao="Alterar Status" width="98%" 
                        funcaoBotao={() => funcaoEditarRelatorio(relatorio)} />

                </div>

            </div>

        </div>
    );
}

export default CardRelatorioComponent;