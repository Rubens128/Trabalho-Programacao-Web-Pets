import styles from "./perfil.module.css";
import Header from "../../components/Header/header.js";
import SideMenu from "../../components/SideMenu/sideMenu.js";
import InputComponent from "../../components/Input/input.js";
import ButtonComponent from "../../components/Button/button.js";
import CardPet from "../../components/CardPet/cardPet.js";
import PopUpComponent from "../../components/popUp/popUp.js";
import { FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from 'react';
import { verificarUsuarioLogado } from '../../services/authService.js';
import { useNavigate } from "react-router-dom";
import { listarPets } from "../../services/petsService.js";
import { deletarPet } from "../../services/petsService.js";
import { EditarUsuario } from "../../services/userService.js";

function Perfil(){

    const [listaAberta, setListaAberta] = useState(0);
    const [editar, setEditar] = useState(false);
    const [cepValue, setCepValue] = useState("");
    const [estadoValue, setEstadoValue] = useState("");
    const [cidadeValue, setCidadeValue] = useState("");
    const [bairroValue, setBairroValue] = useState("");
    const [ruaValue, setRuaValue] = useState("");
    const [numeroValue, setNumeroValue] = useState("");
    const [complementoValue, setComplementoValue] = useState("");
    const [referenciaValue, setReferenciaValue] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [petsAdicionados, setPetAdicionados] = useState([]);
    const [petsAdotados, setPetAdotados] = useState([]);
    const [petIdDeletar, setPetIdDeletar] = useState(null);
    const [popUpConfimacaoAtivo, setPopUpConfimacaoAtivo] = useState(false);
    const [mensagemPopUpAviso, setMensagemPopUpAviso] = useState("");
    const [mensagemPopUpAvisoSucesso, setMensagemPopUpAvisoSucesso] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        
        async function verificarUsuario() {
        
            const retornoUsuario = await verificarUsuarioLogado();
            
            if(retornoUsuario === null) navigate("/login");

            setUsuario(retornoUsuario);

            setCepValue(retornoUsuario.endereco.cep);
            setEstadoValue(retornoUsuario.endereco.estado);
            setCidadeValue(retornoUsuario.endereco.cidade);
            setBairroValue(retornoUsuario.endereco.bairro);
            setRuaValue(retornoUsuario.endereco.rua);
            setNumeroValue(retornoUsuario.endereco.numero);
            setComplementoValue(retornoUsuario.endereco.complemento);
            setReferenciaValue(retornoUsuario.endereco.referencia);
        }

        async function coletarPets() {
            
            verificarUsuario();

            const petsListaAdicionados = await listarPets({
                usuario:{
                    userId: usuario?.uid,
                    verficarAdicionados: true
                }
            });
            const petsListaAdotados = await listarPets({
                usuario:{
                    userId: usuario?.uid,
                    verficarAdotados: true
                }
            });
            
            setPetAdicionados(petsListaAdicionados);
            setPetAdotados(petsListaAdotados);
        }
        
        coletarPets();

    }, [navigate]);

    async function deletarPetHandle() {
        
        setPopUpConfimacaoAtivo(false);

        const resposta = await deletarPet(petIdDeletar);

        if(!resposta){

            setMensagemPopUpAvisoSucesso(false);
            setMensagemPopUpAviso("Erro ao deletar o pet.")

            setTimeout(() =>{
                setMensagemPopUpAviso("");
            }, 3000);

            setPetIdDeletar(null);

            return;
        }

        setMensagemPopUpAvisoSucesso(true);
        setMensagemPopUpAviso("Sucesso ao deletar o pet.");

        setTimeout(() =>{
            setMensagemPopUpAviso("");
        }, 3000);

        setPetAdicionados((petsAntigos) => petsAntigos.filter((pet) => pet.id !== petIdDeletar))

        setPetIdDeletar(null);
    }

    async function editarPerfilHandle() {
        
        const novosDados = {
            ...usuario,
            endereco: {
                cep: cepValue,
                estado: estadoValue,
                cidade: cidadeValue,
                bairro: bairroValue,
                rua: ruaValue,
                numero: numeroValue,
                complemento: complementoValue,
                referencia: referenciaValue,
            }
        }

        if(Object.keys(novosDados.endereco).every((key) => usuario.endereco?.[key] === novosDados.endereco[key])){

            setEditar(false);

            return;
        }

        setPopUpConfimacaoAtivo(false);

        const resposta = await EditarUsuario(usuario.nome, novosDados);

        if(!resposta){

            setMensagemPopUpAvisoSucesso(false);
            setMensagemPopUpAviso("Erro ao editar o usuário.")

            setTimeout(() =>{
                setMensagemPopUpAviso("");
            }, 3000);

            setCepValue(usuario.endereco.cep);
            setEstadoValue(usuario.endereco.estado);
            setCidadeValue(usuario.endereco.cidade);
            setBairroValue(usuario.endereco.bairro);
            setRuaValue(usuario.endereco.rua);
            setNumeroValue(usuario.endereco.numero);
            setComplementoValue(usuario.endereco.complemento);
            setReferenciaValue(usuario.endereco.referencia);

            setEditar(false);

            return;
        }

        setEditar(false);

        setMensagemPopUpAvisoSucesso(true);
        setMensagemPopUpAviso("Sucesso ao editar o usuário.");

        setTimeout(() =>{
            setMensagemPopUpAviso("");
        }, 3000);

        setUsuario(novosDados);
    }

    return(

        <div>
            <Header usuario={usuario}/>
            <div className={styles.divGeral}>
                <SideMenu/>
                <div className={styles.divGeralComponentes}>
                    <h1>Meu Perfil</h1>
                    <div className={styles.divGeralComponentesUsuario}>
                        <div className={styles.divGeralComponentesUsuarioInfo}>
                            <div className={styles.divGeralComponentesUsuarioInfoImage}>
                                <FaUser size={70} color="#604417"/>
                            </div>
                            <div className={styles.divGeralComponentesUsuarioInfoTexto}>
                                <h1 className={styles.divGeralComponentesUsuarioInfoTextoNome}>{usuario?.nome}</h1>
                                <p className={styles.divGeralComponentesUsuarioInfoTextoTipo}> <FaUser /> {usuario?.tipo}</p>
                                <p className={styles.divGeralComponentesUsuarioInfoTextoEmail}> <MdOutlineMail />{usuario?.email}</p>
                            </div>
                            <div className={styles.divGeralComponentesUsuarioInfoBotao}>
                                {
                                    editar ?
                                    <ButtonComponent variante={2} icone={MdEdit} iconeSize={25} 
                                    textoBotao="Salvar" funcaoBotao={editarPerfilHandle}/>
                                    :
                                    <ButtonComponent variante={2} icone={MdEdit} iconeSize={25} 
                                    textoBotao="Editar Perfil" funcaoBotao={() => setEditar(true)}/>
                                }
                                
                            </div>
                        </div>
                        
                        <h1 className={styles.divGeralComponentesUsuarioEnderecoH1}><FaMapMarkerAlt color="#8d6423"/> Endereço</h1>
                    
                        <div className={styles.divGeralComponentesUsuarioEnderecoDiv}>
                                <div className={styles.divGeralComponentesUsuarioEnderecoDivInfo}>
                                    <div>
                                        <p>CEP</p>
                                        {
                                        editar ? 
                                            <InputComponent variavel={cepValue} funcaoSetVariavel={setCepValue}/> 
                                            : <h1>{cepValue}</h1>
                                        }
                                    </div>
                                    <div>
                                        <p>Estado</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={estadoValue} funcaoSetVariavel={setEstadoValue}/> 
                                        : <h1>{estadoValue}</h1>
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>Cidade</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={cidadeValue} funcaoSetVariavel={setCidadeValue}/> 
                                        : <h1>{cidadeValue}</h1>
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>Bairro</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={bairroValue} funcaoSetVariavel={setBairroValue}/> 
                                        : <h1>{bairroValue}</h1>
                                        }
                                        
                                    </div>
                                </div>
                                <div className={styles.divGeralComponentesUsuarioEnderecoDivInfo}>
                                    <div>
                                        <p>Rua</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={ruaValue} funcaoSetVariavel={setRuaValue}/> 
                                        : <h1>{ruaValue}</h1>
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>Número</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={numeroValue} funcaoSetVariavel={setNumeroValue}/> 
                                        : <h1>{numeroValue}</h1>
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>Complemento</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={complementoValue} funcaoSetVariavel={setComplementoValue}/> 
                                        : <h1>{complementoValue}</h1>
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>Referência</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={referenciaValue} 
                                        funcaoSetVariavel={setReferenciaValue}/> 
                                        : <h1>{referenciaValue}</h1>
                                        }
                                        
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className={styles.divGeralComponentesPets}>
                        <div className={styles.divGeralComponentesPetsLista} 
                        style={{display: listaAberta === 2 ? "none" : "flex",
                                width: listaAberta === 0 ? "48%" : "100%"
                        }}>
                            <div className={styles.divGeralComponentesPetsListaInfo}>
                                <div className={styles.divGeralComponentesPetsListaInfoTexto}>
                                    <h1><FaPaw color="#d6a559"/> Pets para adoção</h1>
                                    <p>Pets que você cadastrou para adoção</p>
                                </div>

                                {
                                    listaAberta === 0 ?
                                    <ButtonComponent variante={2} textoBotao="Ver todos" funcaoBotao={() => setListaAberta(1)}/>
                                    :
                                    <ButtonComponent variante={2} textoBotao="Ver menos" funcaoBotao={() => setListaAberta(0)}/>
                                }
                                
                            </div>
                            <div className={styles.divGeralComponentesPetsListaCards}>
                                {petsAdicionados?.map((animal) => {
                                    return (
                                        <CardPet pet={animal} width='40%' height='40dvh' podeEditarDeletar={true}
                                        deletarFuncao={(petId) => {
                                            setPopUpConfimacaoAtivo(true);
                                            setPetIdDeletar(petId);
                                        }} key={animal.id}/>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={styles.divGeralComponentesPetsLista} 
                        style={{display: listaAberta === 1 ? "none" : "flex",
                                width: listaAberta === 0 ? "48%" : "100%"
                        }}>
                            <div className={styles.divGeralComponentesPetsListaInfo}>
                                <div className={styles.divGeralComponentesPetsListaInfoTexto}>
                                    <h1><FaHeart color="#d6a559"/> Pets que adotou</h1>
                                    <p>Pets que você adotou</p>
                                </div>

                                {
                                    listaAberta === 0 ?
                                    <ButtonComponent variante={2} textoBotao="Ver todos" funcaoBotao={() => setListaAberta(2)}/>
                                    :
                                    <ButtonComponent variante={2} textoBotao="Ver menos" funcaoBotao={() => setListaAberta(0)}/>
                                }

                            </div>
                            <div className={styles.divGeralComponentesPetsListaCards}>
                                {petsAdotados?.map((animal) => {
                                    return (
                                        <CardPet pet={animal} width='40%' height='40dvh' jaAdotado={true} key={animal.id}/>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                popUpConfimacaoAtivo ?

                <PopUpComponent mensagem={"Deseja mesmo remover o pet?"} mensagemSucesso={false} 
                popUpConfirmacao={true} funcaoCancelar= {() => {
                    setPetIdDeletar(null);
                    setPopUpConfimacaoAtivo(false);
                }} funcaoConfirmar={deletarPetHandle}/>

                : ""
            }

            {
                mensagemPopUpAviso ?

                <PopUpComponent mensagem={mensagemPopUpAviso} mensagemSucesso={mensagemPopUpAvisoSucesso}/>

                : ""
            }
        </div>
    );
}

export default Perfil;