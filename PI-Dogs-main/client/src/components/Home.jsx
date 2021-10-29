import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, filterByWeight, filterDogsByTemp } from "../actions/actions.js";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentState] = useState(1)
  const [dogsPerPage, setDogPerPage] = useState(8)
  const indexOfLastDogs = currentPage * dogsPerPage
  const indexOFFirstDogs = indexOfLastDogs - dogsPerPage
  const currentDogs = allDogs.slice(indexOFFirstDogs, indexOfLastDogs)


  const paginado = (pageNumber) => {
    setCurrentState(pageNumber)
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
    dispatch(getTemperaments())
  }

  function handleFilterTemp(e){
    dispatch(filterDogsByTemp(e.target.value))
}

  // function handleFilterWeight(event) {
  //   dispatch(filterByWeight(event.target.value))
  // }

  return (
    <div>
      <h1>Create Dogs</h1>
      <Link to="/dogs">Nueva Raza</Link>
      <button onClick={(e) => {handleClick(e);}}>
        Reload Dogs
      </button>
      <div>
      <SearchBar/>
        <select>
          <option value="asc">Upward</option>
          <option value="desc">Descending</option>
        </select>
        <select>
          <option value="Ord">Orden alfabético</option>
          <option value="weight">Peso</option>
          <option value="name">Raza existente</option>
        </select>

        <select onChange={(e)=>handleFilterTemp(e)}>
                    <option name='temperament' key={'a'}>Temperaments</option>
                    {allTemperaments.map((tem,i)=>(
                        <option name='temperaments'key={i} value={tem.name}>{tem.name}</option>
                    ))}
         </select>
        
        <Paginado
        dogsPerPage= {dogsPerPage}
        allDogs= {allDogs.length}
        paginado= {paginado}
        />
        
        {currentDogs?.map((el) => {
          return (
            <div>
                <Card
                  temperament={el.temperament}
                  name={el.name}
                  image={el.image}
                  weight={el.weight}
                  key={el.id}
                />
            </div>
          );
        })}
      </div>
    </div>
  );
}
