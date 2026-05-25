import styles from './cardPet.module.css'
import TesteImg from '../../assets/ourico.png'
import { CiHeart } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";

function CardPet({width = "15%", height = "42%", nomeAnimal, nomeEspecie, local}){

    return (
        <div style={{ width: width, height: height }} className={styles.cardPet}>
            <img src={TesteImg} alt='Imagem de Ouriço'></img>
            <div className={styles.cardPetTags}>
                <p>ADOÇÃO</p>
                <CiHeart size={35} />
            </div>
            <div className={styles.cardPetInfo}>
                <h1>{nomeAnimal}</h1>
                <p>{nomeEspecie} teste</p>
                <p> <FaMapMarkerAlt /> {local}</p>
                <a href='/'>Ver mais +</a>
            </div>
        </div>
    );
}

export default CardPet;