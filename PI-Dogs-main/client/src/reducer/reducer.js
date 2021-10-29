import {GET_DOG, ADD_DOGS, DETAIL_DOGS, GET_TEMPERAMENTS, FILTER_BY_WEIGHT, FILTER_BY_TEMPERAMENT, GET_SEARCHDOGS} from "../actions/types.js"



const initialstate = {
    dogs : [],
    allDogs: [],
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
                 dogs: action.payload
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
            const allDogs = state.dogs
            const tempFilter = action.payload === 'Temperaments' ? allDogs :  allDogs.filter(e => {const aux = e.Temperaments?.map(t=> t.name);
                if (aux?.includes(action.payload)) return e;});
            
            
            return {...state, allDogs: tempFilter
            }

            default:
                return state;
        }

};






