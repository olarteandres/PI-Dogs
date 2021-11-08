import React from "react";
import {useState} from 'react'
import { useDispatch } from "react-redux";
import { getName } from "../actions/actions.js";
import style from './SearchBar.module.css'

export default function SearchBar(){
    const [search, setSearch] = useState(``);
    const dispatch = useDispatch();

    function onSubmit(e){
        e.preventDefault();
        dispatch(getName(search))
    };

    function onInputChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    };

    return(
        <div className={style.search}>
            <form onSubmit={onSubmit}>
                <input className={style.input} type='text' value={search} onChange={onInputChange}/>
                <input className={style.btn} type='submit' value='Buscar'/>
           </form>
        </div>
    )
}