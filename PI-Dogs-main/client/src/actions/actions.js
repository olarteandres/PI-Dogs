import axios from "axios"
import {GET_DOG,GET_DETAILS, GET_TEMPERAMENTS, FILTER_BY_WEIGHT, FILTER_BY_TEMPERAMENT, GET_SEARCHDOGS, FILTER_BY_CREATED, SEARCHBAR, ORDER_BY_NAME,POST_DOGS} from "./types"



export function getDogs () {
    return async function (dispatch){
        var allDogs = await axios ("http://localhost:3001/api/dogs");
        return dispatch ({
          type: GET_DOG,
          payload: allDogs.data
        })
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

export function getDogsDetail (id) {
    return async function (dispatch) {
        try {
            const detail = await axios.get ("http://localhost:3001/api/dogs/" + id,)
            
            return dispatch ({
                type: GET_DETAILS,
                payload: detail.data
                 
            })
        }
        catch(error){
            console.log(error)
        }
    }
}
    

export function filterByWeight (payload) {
    return {
          type: FILTER_BY_WEIGHT,
          payload
          
    } 
}

export function filterDogsByTemp(payload){
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function filterDogsByCreated(payload){
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}

// export function addDog(payload){ 
//    return async function(dispatch){
//        const created = await axios.post('http://localhost:3001/api/dogs', payload);
//        return created;
//    }
// }



export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function getName(name) {
    return async function (dispatch){
        const query = await axios.get('http://localhost:3001/api/dogs?name='+name)
        dispatch ({
            type: SEARCHBAR,
            payload: query.data
        })
    }   
}

export function postDogs(payload) {
    return async function (dispatch){
        const info = await axios.post('http://localhost:3001/api/dogs',payload)
        return info;
    }   
}

