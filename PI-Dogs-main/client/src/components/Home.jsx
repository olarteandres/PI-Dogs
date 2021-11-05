import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, filterByWeight, filterDogsByTemp, filterDogsByCreated, orderByName } from "../actions/actions.js";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogSearch);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [orden, setOrden] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [dogsPerPage, setDogPerPage] = useState(8)
  const indexOfLastDogs = currentPage * dogsPerPage
  const indexOFFirstDogs = indexOfLastDogs - dogsPerPage
  const currentDogs = allDogs?.slice(indexOFFirstDogs, indexOfLastDogs)


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }



  useEffect(() => {
    dispatch(getDogs());
  }, []);
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  function handleClick(event) {
    event.preventDefault();
    dispatch(getDogs());
    // dispatch(getTemperaments())
  }

  function handleFilterTemp(e){
    dispatch(filterDogsByTemp(e.target.value))
}

function handleSortName(e){
  dispatch(orderByName(e.target.value))
  setCurrentPage(1)
  setOrden(`Ordenado ${e.target.value}`)
}

  function handleFilterWeight(event) {
    dispatch(filterByWeight(event.target.value))
    setOrden(`Ordenado ${event.target.value}`)
  }

  function handleFilterByCreated(event) {
    dispatch(filterDogsByCreated(event.target.value))
    
    
  }

  return (
    <div>
      <SearchBar/>
      <h1>Create Dogs</h1>
      <Link to="/dogs">Nueva Raza</Link>
      <button onClick={(e) => {handleClick(e)}}>
        Reload Dogs
      </button>
      <div>
        <select onChange={e => handleSortName(e)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          </select>
        <select onChange={e => handleFilterWeight(e)}>
          <option value="asc">Peso minimo</option>
          <option value="desc">Peso maximo</option>
        </select>

        <select onChange={e => handleFilterByCreated(e)}>
          <option value="Exist">Existentes</option>
          <option value="All">Todas las razas</option>
          <option value="Created">Creadas</option>
        </select>
       
        <select onChange={(e)=>handleFilterTemp(e)}>
                    <option name='temperament' key={'a'}>Temperaments</option>
                    {allTemperaments.map((tem,i)=>(
                        <option name='temperaments'key={i} value={tem.name}>{tem.name}</option>
                    ))}
         </select>
        
        <Paginado
        dogsPerPage= {dogsPerPage}
        allDogs= {allDogs?.length}
        paginado= {paginado}
        />
        
        {currentDogs?.map((el) => {
          return (
            <div>
                <Card
                  temperament={el.temperament? el.temperament : el.Temperaments}
                  name={el.name}
                  image={el.image}
                  weight={el.weight}
                  id={el.id}
                  key={el.id}
                />
            </div>
          );
        })}
      </div>
    </div>
  );
}
