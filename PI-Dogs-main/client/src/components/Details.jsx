import React from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {getDogsDetail} from "../actions/actions.js"
import { useEffect } from "react";



export default function Detail (props){
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDogsDetail(props.match.params.id))
    }, [dispatch])
    
    const myDog = useSelector((state) => state.details)
    console.log(myDog)
    


    return(

        <div>
            {
                myDog.length>0 ?  

                <div>
                    <h1>{myDog.name ? myDog.name : myDog[0].name}</h1>
                    <img src={myDog.image ? myDog.image : myDog[0].image} alt="asdasdasd" width ="200px" height="200px"/>
                     <h2>Origen: {myDog.origin ? myDog.origin : myDog[0].origin }</h2>
                     <h2>Temperamento: {!myDog[0].createdInDb ? myDog[0].temperament + " " : myDog[0].Temperaments.map(el => el.name + (" "))}</h2>
                     <h2>Peso: {myDog.weight}</h2>
                     <h2>Altura: {myDog.height}</h2>
                     <h2>Años de Vida: {myDog.life_span}</h2>

                </div>: <p>Cargando...</p>

            } 
            <Link to ="/home">
                <button>Volver</button>
            </Link>
        </div>

    )
    

}