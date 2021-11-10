import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css'


export default function Card ({image, name, weightMax,weightMin, temperament, id}) {
    
return (
    <div className= {styles.dog_card}>
        <p>{name}</p>
        <img src={image} className={styles.dog_image} alt="img not found"  />
        <p><strong>Temperamentos :</strong> {!Array.isArray(temperament)? temperament :  temperament.map(e => e.name).join(', ')}</p>
        <strong><p>Peso</p></strong>
        <p>{weightMin} a {weightMax} Kg</p>
        <Link to={"/" + id}><button className= {styles.button_details}>Mas Detalles</button></Link>
    </div>
)
}