import {GET_DOG, ADD_DOGS, DETAIL_DOGS, GET_TEMPERAMENTS, FILTER_BY_WEIGHT, FILTER_BY_TEMPERAMENT, GET_SEARCHDOGS} from "../actions/types.js"



const initialstate = {
    dogs : [],
    allDogs: [],
    allDogsTemp: [],
    details : [],
    newDogs : [],
    temperaments: [],
    weight: []

};

 export default function rootReducer (state= initialstate, action) {
     switch(action.type){
         case GET_DOG:
             return{
                 ...state,
                 dogs: action.payload,
                 allDogsTemp: action.payload
             }

         case ADD_DOGS:
            return{
                ...state,
                dogs: state.dogs.concat(action.payload)
            }

         case DETAIL_DOGS:
            return{
                ...state,
                details: action.payload
            }
            case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            }

            case GET_SEARCHDOGS:
            return{
                ...state,
                allDogs: action.payload
            }
            // case FILTER_BY_WEIGHT:
            //     const allDogs = state.dogs
            //     const weightFiltered = action.payload === "Weight" ? allDogs : allDogs.filter(w => w.dogs === action.payload)
            // return{
            //     ...state,
            //     dogs: weightFiltered
            // }

            case FILTER_BY_TEMPERAMENT:
            const allDogsTemp = state.allDogsTemp
            const tempFilter = action.payload === 'Temperaments' ? allDogsTemp :  allDogsTemp.filter(e => {
                if (e.temperament && e.temperament.includes(action.payload)) return e;});
                console.log(tempFilter)
            
            
            return {...state, dogs: tempFilter
            }

            default:
                return state;
        }

};






