const { Router } = require('express');
const axios = require ("axios")
const {API_KEY} = process.env;
const {Dog, Temperament} = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.get('/', async function(req, res, next) {
  const getTemp = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  const infoTemp = getTemp.data.map(response => {
    return {
      temperament: response.temperament
    }
  })
  const Filtrado = infoTemp.filter(data => data.temperament !== undefined)
  let arr = []
  let arr2 = []
  Filtrado.map(r => {arr.push(r.temperament.split(","))
  arr.map(r => {
    for (let i = 0; i < r.length; i++) {
      arr2.push(r[i].trim())
    }
  })
})

let tempFinal = arr2.reduce((a, e) => {
   if(!a.find(d => d === e)){
    a.push(e)
   }
   return a
}, [])
  
  tempFinal.sort()
  
  const apiADB = tempFinal.map((data) => {
    return Temperament.findOrCreate({
      where:{
        name: data,
      }
    })
  })
  
  let showDB = await Temperament.findAll();
  res.send(showDB)
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;