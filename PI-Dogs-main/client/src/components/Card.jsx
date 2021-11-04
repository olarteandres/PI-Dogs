import React from "react";
import { Link } from "react-router-dom";


export default function Card ({image, name, weight, temperament, id}) {
    
return (
    <div>
        <h2>{name}</h2>
        <img src={image} alt="img not found" width="200px" height="250px" />
        <h4>temperamentos:{!Array.isArray(temperament)? temperament :  temperament.map(e => e.name).join(', ')}</h4>
        <h2>Peso</h2>
        <strong><p>{weight[0]} a {weight[1]} Kg</p></strong>
        <Link to={"/" + id}><button>More Details</button></Link>
    </div>
)
}