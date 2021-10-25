const { Router } = require('express');
const dogsRoute = require ("./dogs.js");
const TemperamentsRoute = require ("./Temperaments.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/dogs", dogsRoute)
router.use("/Temperaments", TemperamentsRoute)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
