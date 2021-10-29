import axios from "axios"
import {GET_DOG,DETAIL_DOGS, GET_TEMPERAMENTS, FILTER_BY_WEIGHT, FILTER_BY_TEMPERAMENT, GET_SEARCHDOGS } from "./types"



export function getDogs () {
    return async function (dispatch){
        var allDogs = await axios ("http://localhost:3001/api/dogs");
        return dispatch ({
          type: GET_DOG,
          payload: allDogs.data
        })
    }
}

export function getNameDogs(name){
    
    return async function(dispatch){
        try{
            var json = await axios("http://localhost:3001/dogs?name="+name);
            return dispatch ({
                type : GET_SEARCHDOGS,
                payload: json.data
            })
        }catch (error){
            console.log(error)
        }
    }
}

export function getTemperaments () {
    return async function (dispatch){
        var allTemperaments = await axios ("http://localhost:3001/api/temperaments");
        return dispatch ({
          type: GET_TEMPERAMENTS,
          payload: allTemperaments.data
        })
    }
}

// export function addDogs (name, life_span, image, height, weight, origin) {
//     return {
//         type: ADD_DOGS,
//         payload: (
//             name,
//             life_span,
//             image,
//             height,
//             weight,
//             origin

//         )
//     }
// }

export function getDogsDetail (id) {
    return async function (dispatch){
        var detail = await axios ("http://localhost:3001/api/dogs/" + id,);
        return dispatch ({
          type: DETAIL_DOGS,
          payload: detail.data
        })
    }
}

export function filterByWeight (payload) {
    return {
          type: FILTER_BY_WEIGHT,
          
    } 
}

export function filterDogsByTemp(payload){
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}