const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const {Op} = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const dogsApi = async  () =>{
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  const dogMap = await apiUrl.data.map(response => {
    return {
            name: response.name,
            id: response.id,
            height :hgt=response.height.metric?.split(" - "),
            heightMin:hgt[0],
            heightMax:hgt[1],
            weight : wgt= response.weight.metric?.split(" - "),
            weightMin:wgt[0],
            weightMax: wgt[1],
            life_span: response.life_span,
            image: response.image.url,
            origin: response.origin,
            temperament:response.temperament



          }
        }); 
        return dogMap

}



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
  const dbMap = await getDB();
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
              height :hgt=response.height.metric?.split(" - "),
              heightMin:hgt[0],
              heightMax:hgt[1],
              weight : wgt= response.weight.metric?.split(" - "),
              weightMin:wgt[0],
              weightMax: wgt[1],
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
            const api = await dogsApi();
            const newQuery = await api.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
            const db = await Dog.findAll({
              includes: Temperament,  //para mas adelnate cuando conecte todo
              where: {
                  name: {
                      [Op.iLike]: '%' + name + '%'
                  }
              }
          })
          if(name){
            const api = await dogsApi();
            const newQuery = await api.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
            const infoTotal = newQuery.concat(db);
          


          return res.json(infoTotal);
        }else {
          return res.json(api)

    
        }
      }


// const infoApi2 = info.filter(info => info.name.toLowerCase().includes(name.toLowerCase()))
// return res.json(infoApi2 ? infoApi2 : "Not Found") 
});
router.get('/:id', async (req, res, next) => {
  try{
  const {id} = req.params;
  const dogTotales = await getAllDogs()

  if(typeof id === 'string' && id.length > 8){

      let filter = await dogTotales.filter(e => e.id == id)
      res.send(filter)
      // const db = await Dog.findByPk(id);
      // res.send( db );

  } else {
  const api = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const infoApi = api.data.map(response => {
          return {
              id: response.id,
              image: response.image.url,
              name: response.name,
              life_span: response.life_span,
              height :hgt=response.height.metric?.split(" - "),
              heightMin:hgt[0],
              heightMax:hgt[1],
              weight : wgt= response.weight.metric?.split(" - "),
              weightMin:wgt[0],
              weightMax: wgt[1],
              temperament: response.temperament,
              origin: response.origin,
          }
  }); 

  //hay que traerlos de la base de datos los temperamentos guardados?
  const find = infoApi.filter(data => data.id === Number(id));

  res.send(find? find : 'Id API not found')

  }
  
} catch (err) {
  next(err)
}
});
router.post('/', async function(req, res, next) {
  const {name,  weightMin,weightMax,heightMax,heightMin, life_span, image, origin,temperament, createdInDb} = req.body
  const newDog = await Dog.create({
    name,
    life_span,
    image,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
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