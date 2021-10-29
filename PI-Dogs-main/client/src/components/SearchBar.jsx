import React from "react";
import {useState} from 'react'
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions/actions.js";

// export default function SearchBar() {
//     const [search, setSearch] = useState('')
//     let dispatch = useDispatch()
//     function onSubmit(e) {
//         e.preventDefault();
//         dispatch(searchCountries(search))
//     }

//     function onInputChange(e) {
//         e.preventDefault();
//         setSearch(e.target.value)
//     }

//     return <div>
//         <form onSubmit={onSubmit}>
//             <input type="text" onChange={onInputChange} value={search}/>
//             <input type='submit' value='Search'/>
//         </form>
//     </div>
// }
export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameDogs(name))
    }

    return (
        <div>
            <input
            type= 'text'
            placeholder = "Search..."
            onChange= {(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}