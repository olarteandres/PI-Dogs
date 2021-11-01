import React from "react";
import {useState} from 'react'
import { useDispatch } from "react-redux";
import { getName } from "../actions/actions.js";

export default function SearchBar(){
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    function onSubmit(e){
        e.preventDefault();
        dispatch(getName(search))
    }

    function onInputChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' value={search} onChange={onInputChange}/>
                <input type='submit' value='Buscar' onSubmit={onSubmit}/>
           </form>
        </div>
    )
}