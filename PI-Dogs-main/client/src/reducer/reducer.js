import {GET_DOG, ADD_DOGS, GET_DETAILS, GET_TEMPERAMENTS, FILTER_BY_WEIGHT, FILTER_BY_TEMPERAMENT, SEARCHBAR, FILTER_BY_CREATED, ORDER_BY_NAME} from "../actions/types.js"



const initialstate = {
    dogs : [],
    allDogs: [],
    allDogsTemp: [],
    details : [],
    newDogs : [],
    temperaments: [],
    weight: [],
    dogSearch: []

};

 export default function rootReducer (state= initialstate, action) {
     switch(action.type){
         case GET_DOG:
             return{
                 ...state,
                 dogs: action.payload,
                 allDogsTemp: action.payload,
                 dogSearch: action.payload

                //  details: action.payload
             }

         case ADD_DOGS:
            return{
                ...state,
                
            }

         case GET_DETAILS:
            return{
                ...state,
                details: action.payload
            }
            case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            }

            case SEARCHBAR:
            return{
                ...state,
                dogs: action.payload
            }

            case ORDER_BY_NAME:
                const sortName = action.payload === "asc" ?
                state.dogs.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1
                    }
                    return 0
                }) :
                state.dogs.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    dogs: sortName
                }
                
            

            case FILTER_BY_CREATED:
                const allCreated = state.allDogsTemp
                const createdFilter = action.payload === "Created" ? allCreated.filter(e => e.createdInDb) : allCreated.filter(e => !e.createdInDb)
                return{
                    ...state,
                    dogs: action.payload === "All" ? state.allDogsTemp : createdFilter
                }

            case FILTER_BY_WEIGHT:
                const isNan = state.dogs.filter(e => !isNaN(e.weight? e.weight[0] : e.weight))
                const sortWeight = action.payload === "asc" ?
                isNan.sort(function(a, b){
                    if(parseInt(a.weight? a.weight[0] : a.weight) > parseInt(b.weight? b.weight[0] : b.weightMin)){
                        return 1;
                    }
                    if(parseInt(b.weight? b.weight[0] : b.weight) > parseInt(a.weight? a.weight[0] : a.weightMin)){
                        return -1
                    }
                    return 0
                }) :
                state.dogs.sort(function(a, b){
                    if(parseInt(a.weight? a.weight[0] : a.weight) > parseInt(b.weight? b.weight[0] : b.weightMax)){
                        return -1
                    }
                    if(parseInt(b.weight? b.weight[0] : b.weight) > parseInt(a.weight? a.weight[0] : a.weightMax)){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    dogs: sortWeight
                }

            case FILTER_BY_TEMPERAMENT:
            const dogsTemp = state.allDogsTemp
            const tempFilter = action.payload === 'Temperaments' ? dogsTemp :  dogsTemp.filter(e => {
                if (e.temperament && e.temperament.includes(action.payload)) return e})
            return {...state, dogs: tempFilter
            }

            default:
                return state;
        }

};






