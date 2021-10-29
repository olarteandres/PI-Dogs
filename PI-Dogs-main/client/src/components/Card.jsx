import React from "react";
import { Link } from "react-router-dom";


export default function Card ({image, name, weight, temperament, id}) {
return (
    <div>
        <h2>{name}</h2>
        <img src={image} alt="img not found" width="200px" height="250px" />
        <h4>{temperament}</h4>
        <p>{weight}</p>
        <Link to={"/home/" + id}><button>More Details</button></Link>
    </div>
)
}