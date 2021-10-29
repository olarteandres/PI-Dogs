const { Router } = require('express');
const axios = require ("axios")
const {API_KEY} = process.env;
const {Dog, Temperament} = require('../db');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const getDB = async () => {
  return await Dog.findAll({
      includes: Temperament,
  });
}
router.get('/', async (req, res, next) => {
    //acá va a estar el query tambien en caso de que tenga if(req.query) ...
    const {name} = req.query;
    const getApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    
    if(!name){
      const infoApi = getApi.data.map(response => {
        return {
                name: response.name,
                id: response.id,
                weight: response.weight.metric,
                height: response.height.metric,
                life_span: response.life_span,
                image: response.image.url,
                weigthMin: response.weight.metric.split("-"),
                heightMax: response.weight.metric.split("-"),
                origin: response.origin,
                temperamet: response.temperamet
                

              }
            }); 
            const data = await getDB()
            const dataAll = infoApi.concat(data)

        return res.json(dataAll);
    }else {

      const infoApi = getApi.data.map(response => {
        return {
            name: response.name,
            weight: response.weight.metric,
            height: response.height.metric,
            life_span: response.life_span,
            image: response.image.url,
            origin: response.origin,
            id: response.id,
            
        }
        
    }); 
    const infoApi2 = infoApi.filter(info => info.name.toLowerCase().includes(name.toLowerCase()))
      
      
   
    return res.json(infoApi2 ? infoApi2 : "Not Found") 
    }
});


router.get("/:id", async (req, res, next) => {
  try{
    const {id} = req.params;
    if(typeof id === 'string' && id.length > 8){
        
      const db = await Dog.findByPk(id);
      res.send( db );

  } 
    const getApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const infoApi = getApi.data.map(response =>{
      return {
        id: response.id,
        name: response.name,
        life_span: response.life_span,
        weight: response.weight,
        height: response.height,
        
      }
    })
    const find = infoApi.find(data => data.id === Number(id));
    res.send(find ? find : "id not Found")
  } catch(err){
    next(err)
  }
})

  router.post('/', async function(req, res, next) {
    const {name, height, weight, life_span, image, origin} = req.body
    const newDog = await Dog.create({
      name,
      life_span,
      image,
      height,
      weight,
      origin,
      
      
      
    });
    res.send(newDog)
  });
    


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
