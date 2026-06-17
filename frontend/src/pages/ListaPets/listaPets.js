import styles from './listaPets.module.css';
import Header from '../../components/Header/header';
import InputComponent from '../../components/Input/input';
import CheckBoxComponent from "../../components/CheckBox/checkbox";
import ButtonComponent from '../../components/Button/button';
import CardPet from "../../components/CardPet/cardPet"
import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { useEffect } from 'react';
import { verificarUsuarioLogado } from '../../services/authService.js';
import { listarPets } from '../../services/petsService.js';
import { useSearchParams } from 'react-router-dom';

function ListaPets(){

    const [ inputValue, setInputValue ] = useState("");
    const [ filtroEspecie, setFiltroEspecie ] = useState({
        todos: true,
        repteis: false,
        mamiferos: false,
        aves: false,
        anfibios: false,
        peixes: false,
        invertebrados: false
    });
    const [ filtroPorte, setfiltroPorte ] = useState({
        todos: true,
        pequeno: false,
        medio: false,
        grande: false
    });
    const [ idadeMin, setIdadeMin ] = useState(undefined);
    const [ idadeMax, setIdadeMax ] = useState(undefined);
    const [ animaisInfo, setAnimaisInfo ] = useState();
    const [ usuario, setUsuario ] = useState(null);
    const [ searchParams ] = useSearchParams();

    useEffect(() => {
        
        async function verificarUsuario() {
        
            const retornoUsuario = await verificarUsuarioLogado();
        
            setUsuario(retornoUsuario);
        }

        async function coletarPets() {

            const filtro = searchParams.get("filtro");

            let filtrosFinais = {...filtroEspecie};

            if(filtro) {

                setFiltroEspecie((filtrosAntigos) => ({
                    ...filtrosAntigos,
                    "todos": false,
                    [filtro]: true,
                }));

                filtrosFinais ={
                    ...filtroEspecie,
                    "todos": false,
                    [filtro]: true,
                }
            }

            const petsLista = await listarPets({
                filtroEspecie: {
                    ...filtrosFinais
                }
            });
            
            setAnimaisInfo(petsLista);
        }
        
        verificarUsuario();
        coletarPets();

    }, []);

    async function aplicarFiltros() {

        console.log("Aplicando filtros:", {
            filtroEspecie,
            filtroPorte,
            idadeMin,
            idadeMax
        });

        const filtros = {
            filtroEspecie: {
                ...filtroEspecie
            },
            filtroPorte: {
                ...filtroPorte
            },
            idadeMin: idadeMin ? parseInt(idadeMin) : 0,
            idadeMax: idadeMax ? parseInt(idadeMax) : 1000,
        }

        if(inputValue.trim() !== "") filtros.pesquisa = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLocaleLowerCase();

        const petsLista = await listarPets(filtros);

        console.log("Pets encontrados com filtros:", petsLista);

        setAnimaisInfo(petsLista);
    }

    return (
        <div>
            <Header usuario={usuario}/>
            <div className={styles.divTituloInput}>
                <div className={styles.divTituloInputTexto}>
                    <h1>Animais Disponíveis</h1>
                    <p>Encontre seu novo melhor amigo exótico!</p>
                </div>
                <InputComponent variavel={inputValue} funcaoSetVariavel={setInputValue} icone={CiSearch} sizeIcon={25}
                placeholder='Buscar por nome, espécie ou característica...' width='40%' height='7dvh' type='text'/>
                <button onClick={aplicarFiltros}> <IoSend size={25}/> </button>
            </div>
            <div className={styles.divPets}>
                <div className={styles.divPetsFiltros}>

                    <h1> <IoFilterOutline /> Filtros:</h1>

                    <div className={styles.divPetsFiltrosFiltro}>
                        <p>Espécie:</p>
                        { 
                            Object.keys(filtroEspecie).map((index) => {
                                return (
                                    <CheckBoxComponent texto={index} variavel={filtroEspecie} 
                                    setFuncaoVariavel={setFiltroEspecie} index={index} key={index}/> 
                                );
                            })
                        }
                    </div>

                    <div className={styles.divPetsFiltrosFiltro}>
                        <p>Porte:</p>
                        { 
                            Object.keys(filtroPorte).map((index) => {
                                return (
                                    <CheckBoxComponent texto={index} variavel={filtroPorte} 
                                    setFuncaoVariavel={setfiltroPorte} index={index} key={index}/> 
                                );
                            })
                        }
                    </div>
                    
                    <div className={styles.divPetsFiltrosFiltro}>

                        <div>
                            <p style={{marginRight: 12}}>Idade Min:</p>
                            <InputComponent placeholder='2,5,8,10,15' height={"4dvh"} type='number'
                            variavel={idadeMin} funcaoSetVariavel={setIdadeMin}/>
                        </div>

                        <div>
                            <p style={{marginRight: 7}} >Idade Max:</p>
                            <InputComponent placeholder='2,5,8,10,15' height={"4dvh"} type='number'
                            variavel={idadeMax} funcaoSetVariavel={setIdadeMax}/>
                        </div>

                    </div>

                    <ButtonComponent variante={1} icone={IoFilterOutline} iconeSize={20} textoBotao='Aplicar Filtros'
                    funcaoBotao={aplicarFiltros}/>
                </div>

                <div className={styles.divPetsOpcoes}>
                        <div className={styles.divPetsTexto}>
                            <h1>{animaisInfo?.length} Animais Encontrados</h1>
                            <p>Ordernar por</p>
                        </div>
                        <div className={styles.divPetsOpcoesCards}>
                            { animaisInfo?.map((animal) => {
                                return (
                                    <CardPet pet={animal} width='23%' height='50dvh' key={animal.id}/>
                                );
                            })}
                        </div>
                </div>
            </div>
        </div>
    );
}

export default ListaPets;