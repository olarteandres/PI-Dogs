import React from "react";


export default function Card ({image, name, weight, temperament}) {
return (
    <div>
        <h2>{name}</h2>
        <img src={image} alt="img not found" width="200px" height="250px" />
        <h4>{temperament}</h4>
        <p>{weight}</p>
    </div>
)
}