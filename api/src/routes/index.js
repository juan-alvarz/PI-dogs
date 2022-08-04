const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require("./dog_router.js");
const temperament = require("./temp_router");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", dogs);
router.use("/temp", temperament);
router.get("/", () => {
  console.log("ruta principal");
});

module.exports = router;
