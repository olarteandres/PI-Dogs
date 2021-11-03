const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const {Op} = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();



const getDB = async () => {
  return await Dog.findAll({
      include: {
          model: Temperament,
          attribute:{
              include: ['name']
          } ,
          through: {
              attribute:[]
          }
      }
  });
}
const getAllDogs = async ()=>{
  let dogMap = await dogsApi();
  const dbMap = await databaseDog();
  const allMap = await dogMap.concat(dbMap);
  return allMap;
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
              weight: response.weight.metric.split("-"),
              height: response.height.metric.split("-"),
              life_span: response.life_span,
              image: response.image.url,
              origin: response.origin,
              temperament:response.temperament
              
              

            }
          }); 
          const data = await getDB()
          const dataAll = infoApi.concat(data)
          return res.json(dataAll)
        }
          

          if(name){
            const api = await getApi();
            const newQuery = await api.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
            const db = await Dog.findAll({
              includes: Temperament,  //para mas adelnate cuando conecte todo
              where: {
                  name: {
                      [Op.iLike]: '%' + name + '%'
                  }
              }
          })
          const infoTotal = newQuery.concat(db);
            

          return res.json(infoTotal);
          }

  
// const infoApi2 = info.filter(info => info.name.toLowerCase().includes(name.toLowerCase()))
// return res.json(infoApi2 ? infoApi2 : "Not Found") 
});


router.get('/:id', async (req, res, next) => {
  try{
  const {id} = req.params;
  
  if(typeof id === 'string' && id.length > 8){
      
      // const db = await Dog.findByPk(id);
      // res.send( db );
      

  } else {

  const api = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const infoApi = api.data.map(response => {
          return {
              id: response.id,
              name: response.name,
              life_span: response.life_span,
              weight: response.weight.metric,
              height: response.height.metric,
              temperament: response.temperament,
              origin: response.origin,
          }
  }); 

  //hay que traerlos de la base de datos los temperamentos guardados?
  const find = infoApi.find(data => data.id === Number(id));
  
  res.send(find? find : 'Id API not found')

  }
  
} catch (err) {
  next(err)
}
});

router.post('/', async function(req, res, next) {
  const {name, height, weight, life_span, image, origin,temperament, createdInDb} = req.body
  const newDog = await Dog.create({
    name,
    life_span,
    image,
    height,
    weight,
    origin,
    createdInDb
    
    
    
  });
  temperament.map(async e => {
    const temperamentDB = await Temperament.findAll({
        where: {
            name : e
        },
        include: [Dog]
    })
    newDog.addTemperament(temperamentDB)
})
  res.json(newDog)
});

module.exports = router;
