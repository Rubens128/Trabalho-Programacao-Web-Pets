import styles from './cardPet.module.css';
import TesteImg from '../../assets/ourico.png';
import ButtonComponent from "../Button/button";
import InputComponent from "../Input/input";
import TextInputComponent from "../TextInput/textInput";
import PopUpComponent from '../popUp/popUp';
import { CiHeart } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { editarPet } from '../../services/petsService';

function CardPet({width = "15%", height = "42%", pet, podeEditarDeletar=false, 
                    logado=false, jaAdotado=false, deletarFuncao= () => ""}){

    const [ verMais, setVerMais ] = useState(false);
    const [ editando, setEditando ] = useState(false);
    const [ nomeValue, setNomeValue ] = useState(pet.nome);
    const [ idadeValue, setIdadeValue ] = useState(pet.dataNasc);
    const [ especieValue, setEspecieValue ] = useState(pet.especie);
    const [ localValue, setLocalValue ] = useState(pet.local);
    const [ statusValue, setStatusValue ] = useState(pet.status);
    const [ descricaoValue, setDescricaoValue ] = useState(pet.descricao);
    const [ mensagemPopUp, setMensagemPopUp ] = useState("");
    const [ mensagemPopUpSucesso, setMensagemPopUpSucesso] = useState(true);
    const [ valoresAntigos, setValoresAntigos ] = useState({
        nome: pet.nome,
        idade: pet.dataNasc,
        especie: pet.especie,
        local: pet.local,
        status: pet.status,
        descricao: pet.descricao,
    });
    const refInputs = useRef({})
    
    const navigate = useNavigate();

    async function editarPetHandle(){

        const valoresNovosDict = {
            nome: nomeValue,
            dataNasc: idadeValue,
            especie: especieValue,
            local: localValue,
            status: statusValue,
            descricao: descricaoValue,
        }

        if(Object.keys(valoresNovosDict).every((chave) => valoresNovosDict[chave] === valoresAntigos[chave])){

            setEditando(false);

            return;
        }

        const editar = await editarPet(pet.id, valoresNovosDict);

        if(!editar || Object.keys(editar).includes("erro")){

            let messagemErro = "";

            if(editar && Object.keys(editar).includes("erro")) messagemErro = editar.erro;
            else messagemErro = "Erro ao editar pet. Tente novamente mais tarde.";

            setMensagemPopUp(messagemErro);
            setMensagemPopUpSucesso(false);

            setTimeout(() => {
                setMensagemPopUp("")
            }, 3000);

            setNomeValue(valoresAntigos.nome);
            setIdadeValue(valoresAntigos.idade);
            setEspecieValue(valoresAntigos.especie);
            setLocalValue(valoresAntigos.local);
            setStatusValue(valoresAntigos.status);
            setDescricaoValue(valoresAntigos.descricao);

            setEditando(false);

            return;
        }

        setValoresAntigos(valoresNovosDict);

        setMensagemPopUp("Sucesso ao editar informações do pet.");
        setMensagemPopUpSucesso(true);

        setTimeout(() => {
            setMensagemPopUp("")
        }, 3000);

        setEditando(false);
    }

    return (
        <div style={{ width: width, height: height }} className={styles.cardPet}>
            <div className={styles.cardPetImageDiv}>
                <img src={pet.fotoPetUrl} alt='Imagem de Ouriço'></img>
            </div>
            <div className={styles.cardPetTags}>
                <p>ADOÇÃO</p>
                <CiHeart size={35} />
            </div>
            <div className={styles.cardPetInfo}>
                <h1>{nomeValue}</h1>
                <p>{especieValue}</p>
                <p> <FaMapMarkerAlt /> {localValue}</p>
                <a onClick={() => setVerMais(true)}>Ver mais +</a>
            </div>

            <div className={styles.cardPetVerMais} style={{display: verMais ? "flex" : "none"}}>
                <div className={styles.cardPetVerMaisInfos}>
                    
                    <div className={styles.cardPetVerMaisInfosDiv}>
                        
                        <div className={styles.cardPetVerMaisInfosDivImage}>
                            <img src={pet.fotoPetUrl}/>
                        </div>

                        <div className={styles.cardPetVerMaisInfosDivColuna}>
                            
                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Nome:</h1>
                                { editando ? 
                                    <InputComponent variavel={nomeValue} funcaoSetVariavel={setNomeValue} 
                                    height={"50%"} width={"90%"}/> 
                                    : <p>{nomeValue}</p> 
                                }
                            </div>

                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Especie:</h1>
                                { editando ? 
                                    <InputComponent variavel={especieValue} funcaoSetVariavel={setEspecieValue} 
                                    height={"50%"} width={"90%"}/> 
                                    : <p>{especieValue}</p>
                                }
                            </div>

                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Adicionado Em:</h1>
                                <p>{pet.adicionadoEm}</p>
                            </div>
                        </div>

                        <div className={styles.cardPetVerMaisInfosDivColuna}>

                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Idade:</h1>
                                { editando ? 
                                    <InputComponent variavel={idadeValue} funcaoSetVariavel={setIdadeValue} 
                                    height={"50%"} width={"90%"}/> 
                                    : <p>temporario ano / {idadeValue}</p>
                                }
                            </div>
                            
                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Local:</h1>
                                { editando ? 
                                    <InputComponent variavel={localValue} funcaoSetVariavel={setLocalValue} 
                                    height={"50%"} width={"90%"}/> 
                                    : <p>{localValue}</p> 
                                }
                            </div>

                            <div className={styles.cardPetVerMaisInfosDivColunaDado}>
                                <h1>Status:</h1>
                                { editando ? 
                                    <InputComponent variavel={statusValue} funcaoSetVariavel={setStatusValue} 
                                    height={"50%"} width={"90%"}/> 
                                    : <p>{statusValue}</p> 
                                }
                            </div>

                        </div>
                    </div>
                    
                    <div className={styles.cardPetVerMaisInfosDiv} style={{justifyContent: "space-between"}}>

                        <div className={styles.cardPetVerMaisInfosDivColuna}>
                            <div className={styles.cardPetVerMaisInfosDivColunaDado} style={{alignSelf: "center", height: "90%"}}>
                                <h1>Descricao:</h1>
                                { editando ? 
                                    <TextInputComponent variavel={descricaoValue} funcaoSetVariavel={setDescricaoValue} 
                                    height={"100%"} width={"90%"}/> 
                                    : <p>{descricaoValue}</p>
                                }
                            </div>
                        </div>

                        <h1 className={styles.cardPetVerMaisInfosDivHeal}>Heal the world, <br/>Adote o amor!</h1>
                        
                        {
                        podeEditarDeletar ?
                            <div className={styles.cardPetVerMaisInfosDivBotoes}>
                                {
                                    editando ?

                                        <ButtonComponent variante={1} textoBotao={"Salvar"} 
                                            funcaoBotao={editarPetHandle}/>
                                    :

                                        <>
                                            <ButtonComponent variante={2} textoBotao={"Fechar"} 
                                                funcaoBotao={() => setVerMais(false)}/>

                                            <ButtonComponent variante={1} textoBotao={"Deletar"}
                                                funcaoBotao={() => {
                                                    deletarFuncao(pet.id);
                                                    setVerMais(false);
                                                }}/>

                                            <ButtonComponent variante={1} textoBotao={"Editar"} 
                                                funcaoBotao={() => setEditando(true)}/>
                                        </>
                                }

                                
                            </div>
                            
                        :

                            <div className={styles.cardPetVerMaisInfosDivBotoes}>
                                
                                <ButtonComponent variante={2} textoBotao={"Fechar"} 
                                    funcaoBotao={() => setVerMais(false)}/>

                        
                                { 
                                    jaAdotado ? "" :
                                    <ButtonComponent variante={1} textoBotao={"Adotar"} 
                                        funcaoBotao={() => navigate(`/formularioAdocao/${pet.id}`)}/>
                                } 
                            
                            </div>
                        }
                    </div>

                </div>
            </div>

            {
                mensagemPopUp ?

                <PopUpComponent mensagem={mensagemPopUp} mensagemSucesso={mensagemPopUpSucesso}/>

                : ""
            }
        </div>
    );
}

export default CardPet;