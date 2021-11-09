import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css'


export default function Card ({image, name, weightMax,weightMin, temperament, id}) {
    
return (
    <div className= {styles.dog_card}>
        <p>{name}</p>
        <img src={image} className={styles.dog_image} alt="img not found"  />
        <p>temperamentos:{!Array.isArray(temperament)? temperament :  temperament.map(e => e.name).join(', ')}</p>
        <p>Peso</p>
        <strong><p>{weightMax} a {weightMin} Kg</p></strong>
        <Link to={"/" + id}><button className= {styles.button_details}>More Details</button></Link>
    </div>
)
}