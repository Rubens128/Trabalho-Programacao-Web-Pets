import styles from "./perfil.module.css";
import Header from "../../components/Header/header.js";
import SideMenu from "../../components/SideMenu/sideMenu.js";
import InputComponent from "../../components/Input/input.js";
import ButtonComponent from "../../components/Button/button.js";
import CardPet from "../../components/CardPet/cardPet.js"
import { FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from 'react';
import { verificarUsuarioLogado } from '../../services/authService.js';

function Perfil(){

    const [listaAberta, setListaAberta] = useState(0);
    const [editar, setEditar] = useState(false);
    const [nomeValue, setNomeValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [cepValue, setCepValue] = useState("");
    const [estadoValue, setEstadoValue] = useState("");
    const [cidadeValue, setCidadeValue] = useState("");
    const [bairroValue, setBairroValue] = useState("");
    const [ruaValue, setRuaValue] = useState("");
    const [numeroValue, setNumeroValue] = useState("");
    const [complementoValue, setComplementoValue] = useState("");
    const [referenciaValue, setReferenciaValue] = useState("");
    const [ usuario, setUsuario ] = useState(null);

    useEffect(() => {
        
        async function verificarUsuario() {
        
        const retornoUsuario = await verificarUsuarioLogado();
        
        setUsuario(retornoUsuario);
        }
        
        verificarUsuario();

    }, []);

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
                                <h1 className={styles.divGeralComponentesUsuarioInfoTextoNome}>Usuario Teste</h1>
                                <p className={styles.divGeralComponentesUsuarioInfoTextoTipo}> <FaUser /> Usuário</p>
                                <p className={styles.divGeralComponentesUsuarioInfoTextoEmail}> <MdOutlineMail />usuario@gmail.com</p>
                            </div>
                            <div className={styles.divGeralComponentesUsuarioInfoBotao}>
                                {
                                    editar ?
                                    <ButtonComponent variante={2} icone={MdEdit} iconeSize={25} 
                                    textoBotao="Salvar" funcaoBotao={() => setEditar(false)}/>
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
                                            : <h1>70000-000</h1>
                                        }
                                    </div>
                                    <div>
                                        <p>Estado</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={estadoValue} funcaoSetVariavel={setEstadoValue}/> 
                                        : <h1>DF</h1>
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>Cidade</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={cidadeValue} funcaoSetVariavel={setCidadeValue}/> 
                                        : <h1>Brasília</h1>
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>Bairro</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={bairroValue} funcaoSetVariavel={setBairroValue}/> 
                                        : <h1>Asa Norte</h1>
                                        }
                                        
                                    </div>
                                </div>
                                <div className={styles.divGeralComponentesUsuarioEnderecoDivInfo}>
                                    <div>
                                        <p>Rua</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={ruaValue} funcaoSetVariavel={setRuaValue}/> 
                                        : <h1>Rua Teste</h1>}
                                        
                                    </div>
                                    <div>
                                        <p>Número</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={numeroValue} funcaoSetVariavel={setNumeroValue}/> 
                                        : <h1>123</h1>
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>Complemento</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={complementoValue} funcaoSetVariavel={setComplementoValue}/> 
                                        : <h1>Casa Verde</h1>
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>Referência</p>
                                        {
                                        editar ? 
                                        <InputComponent variavel={referenciaValue} 
                                        funcaoSetVariavel={setReferenciaValue}/> 
                                        : <h1>Perto da floresta</h1>
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
                                <CardPet width="40%" height={"40dvh"} nomeAnimal={"teste"} nomeEspecie={"teste"} local={"teste"}/>
                                <CardPet width="40%" height={"40dvh"} nomeAnimal={"teste"} nomeEspecie={"teste"} local={"teste"}/>
                                <CardPet width="40%" height={"40dvh"} nomeAnimal={"teste"} nomeEspecie={"teste"} local={"teste"}/>
                                <CardPet width="40%" height={"40dvh"} nomeAnimal={"teste"} nomeEspecie={"teste"} local={"teste"}/>
                                <CardPet width="40%" height={"40dvh"} nomeAnimal={"teste"} nomeEspecie={"teste"} local={"teste"}/>
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
                                <CardPet width="40%" height={"40dvh"} nomeAnimal={"teste"} nomeEspecie={"teste"} local={"teste"}/>
                                <CardPet width="40%" height={"40dvh"} nomeAnimal={"teste"} nomeEspecie={"teste"} local={"teste"}/>
                                <CardPet width="40%" height={"40dvh"} nomeAnimal={"teste"} nomeEspecie={"teste"} local={"teste"}/>
                                <CardPet width="40%" height={"40dvh"} nomeAnimal={"teste"} nomeEspecie={"teste"} local={"teste"}/>
                                <CardPet width="40%" height={"40dvh"} nomeAnimal={"teste"} nomeEspecie={"teste"} local={"teste"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;