import styles from './cardPet.module.css';
import TesteImg from '../../assets/ourico.png';
import ButtonComponent from "../Button/button"
import { CiHeart } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from 'react';
import { useNavigation } from "react-router-dom"

function CardPet({width = "15%", height = "42%", pet, editar=false, logado=false}){

    const [ verMais, setVerMais ] = useState(false);
    const [ editando, setEditando ] = useState(false);

    return (
        <div style={{ width: width, height: height }} className={styles.cardPet} key={pet.id}>
            <img src={TesteImg} alt='Imagem de Ouriço'></img>
            <div className={styles.cardPetTags}>
                <p>ADOÇÃO</p>
                <CiHeart size={35} />
            </div>
            <div className={styles.cardPetInfo}>
                <h1>{pet.nome}</h1>
                <p>{pet.especie}</p>
                <p> <FaMapMarkerAlt /> {pet.local}</p>
                <a onClick={() => setVerMais(true)}>Ver mais +</a>
            </div>

            <div className={styles.cardPetVerMais} style={{display: verMais ? "flex" : "none"}}>
                <div className={styles.cardPetVerMaisInfos}>
                    
                    <div className={styles.cardPetVerMaisInfosDiv}>
                        
                        <div className={styles.cardPetVerMaisInfosDivImage}>
                            <img src={TesteImg}/>
                        </div>

                        <div className={styles.cardPetVerMaisInfosDivColuna}>
                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Nome:</h1>
                                <p>{pet.nome}</p>
                            </div>
                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Especie:</h1>
                                <p>{pet.especie}</p>
                            </div>
                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Adicionado Em:</h1>
                                <p>{pet.adicionadoEm}</p>
                            </div>
                        </div>

                        <div className={styles.cardPetVerMaisInfosDivColuna}>
                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Idade:</h1>
                                <p>temporario ano / {pet.dataNasc}</p>
                            </div>
                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Local:</h1>
                                <p>{pet.local}</p>
                            </div>
                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Status:</h1>
                                <p>{pet.status}</p>
                            </div>
                        </div>

                    </div>
                    
                    <div className={styles.cardPetVerMaisInfosDiv} style={{justifyContent: "space-between"}}>

                        <div className={styles.cardPetVerMaisInfosDivColuna}>
                            <div className={styles.cardPetVerMaisInfosDivColunaDado} style={{alignSelf: "center"}}>
                                <h1>Descricao:</h1>
                                <p>{pet.descricao}</p>
                            </div>
                        </div>

                        <h1 className={styles.cardPetVerMaisInfosDivHeal}>Heal the world, <br/>Adote o amor!</h1>

                        <div className={styles.cardPetVerMaisInfosDivBotoes}>
                            <ButtonComponent variante={2} textoBotao={"Fechar"} 
                            funcaoBotao={() => setVerMais(false)}/>

                            {
                                editar ?
                                    <ButtonComponent variante={1} textoBotao={"Editar"} 
                                    funcaoBotao={() => setEditando(true)}/>
                                :
                                    <ButtonComponent variante={1} textoBotao={"Adotar"} 
                                    funcaoBotao={() => setVerMais(false)}/>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CardPet;