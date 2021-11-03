import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDogs, getTemperaments, filterByWeight} from "../actions/actions.js"

function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = "Se requiere un nombre";
    } if (!input.weight){
        errors.weight = "Se requiere Peso";
    }if (!input.height){
        errors.height = "Se requiere Altura";
    }else if (!input.life_span){
        errors.life_span = "Se requiere Edad";
    }
    return errors;
};

export default function CreateDogs () {
    const dispatch = useDispatch()
    const history = useHistory()
    const allTemperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        weight:"",
        height:"",
        life_span:"",
        image:"",
        temperament: []
    })
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleCheck (e) {
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    function deleteTemp(e){
        e.preventDefault();
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== e.target.value)
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postDogs(input))
        alert("your dog was successfully created")
        setInput({
            name: "",
            weight:"",
            height:"",
            life_span:"",
            image:"",
            temperament: []
        })
        history.push("/home")
    }



    useEffect(() => {
        dispatch(getTemperaments());
      }, []);


      return (
          <div>
             <Link to= "/home"><button>Volver</button></Link>
             <h1>Create Dog</h1>
             <form onSubmit={(e) => handleSubmit(e)}>
                 <div>
                     <label>Name:</label>
                     <input type="text" value= {input.name}name= "name"onChange={(e) => handleChange(e)}/>
                     {errors.name && (<p>{errors.name}</p>)}
                 </div>
                 <div>
                     <label>weight:</label>
                     <input type="number" placeholder= "Max" value= {input.weight.max}name= "weightMax"onChange={(e) => handleChange(e)}/>
                     {errors.weight && (<p>{errors.weight}</p>)}
                     <input type="number" placeholder= "Min" value= {input.weight.min}name= "weightMin"onChange={(e) => handleChange(e)}/>
                     {errors.weight && (<p>{errors.weight}</p>)}
                 </div>
                 <div>
                     <label>height:</label>
                     <input type="number" placeholder= "Max" value= {input.height.max}name= "heightMax"onChange={(e) => handleChange(e)}/>
                     {errors.height && (<p>{errors.height}</p>)}
                     <input type="number" placeholder= "Min" value= {input.height.min}name= "heightMin"onChange={(e) => handleChange(e)}/>
                     {errors.height && (<p>{errors.height}</p>)}
                 </div>
                 <div>
                     <label>life_span:</label>
                     <input type="number"value= {input.life_span}name= "life_span"onChange={(e) => handleChange(e)}/>
                     {errors.life_span && (<p>{errors.life_span}</p>)}
                 </div>
                 <div>
                     <label>Imagen:</label>
                     <input type="text" placeholder= "url de imagen" value= {input.image}name= "image"onChange={handleChange}/>
                 </div>

                     <select onChange= {(e) => handleSelect(e)}>
                         {allTemperaments.map((temp) => (
                             <option value={temp.name}>{temp.name}</option>
                         ))}
                     </select>
                     <div>
                        {input.temperament.map(e =>(
                                <button value={e} onClick={deleteTemp}> {e} </button>
                        ))} 
                    </div>
                     {/* <ul><li>{input.temperament.map(el => el + " ,")}</li></ul> */}
                     

                     <button type= "submit" onSubmit={(e) => handleSubmit(e)}>Create Dog</button>
                 

             </form>
          </div>
      )






}

