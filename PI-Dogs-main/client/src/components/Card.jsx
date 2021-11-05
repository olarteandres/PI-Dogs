import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css'


export default function Card ({image, name, weight, temperament, id}) {
    
return (
    <div className= {styles.dog_card}>
        <h2>{name}</h2>
        <img src={image} className={styles.dog_image} alt="img not found"  />
        <h4>temperamentos:{!Array.isArray(temperament)? temperament :  temperament.map(e => e.name).join(', ')}</h4>
        <h2>Peso</h2>
        <strong><p>{weight[0]} a {weight[1]} Kg</p></strong>
        <Link to={"/" + id}><button className= {styles.button_details}>More Details</button></Link>
    </div>
)
}