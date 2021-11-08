import React from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {getDogsDetail} from "../actions/actions.js"
import { useEffect } from "react";
import styles from './Details.module.css'



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

                <div className= {styles.dog_card}>
                    <h4>{myDog.name ? myDog.name : myDog[0].name}</h4>
                    <img src={myDog.image ? myDog.image : myDog[0].image} alt="asdasdasd" width ="200px" height="200px"/>
                     <p>Origen: {myDog.origin ? myDog.origin : myDog[0].origin }</p>
                     <p>Temperamento: {!myDog[0].createdInDb ? myDog[0].temperament + " " : myDog[0].Temperaments.map(el => el.name + (" "))}</p>
                     <p>Peso: {myDog[0].weight ? myDog[0].weight : myDog[0].weight}</p>
                     <p>Altura: {myDog[0].height ? myDog[0].height : myDog[0].height}</p>
                     <p>Años de Vida: {myDog.life_span ? myDog.life_span : myDog[0].life_span}</p>

                </div>: <p>Cargando...</p>

            } 
            <Link to ="/home">
                <button className= {styles.button_details}>Volver</button>
            </Link>
        </div>

    )
    

}