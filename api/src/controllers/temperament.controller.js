const { Temperamento } = require("../db.js");
const axios = require("axios");
// const {Op} = require('sequelize');
require("dotenv").config();

const temperamento = async (req, res) => {
  // Me traigo los Dogs de la api
  const resultado = await axios.get("https://api.thedogapi.com/v1/breeds");
  // Guardo en lista de temperamentos todos los resultados despues de aplicarle limpieza a cada uno
  const listaTemperamentos = resultado.data.map((el) => {
    // Si no viene un temperamento agrego undefined
    if (!el.temperament) return (el.temperament = undefined);
    // A todos los demas los spliteo por ", " para añadirlos a un array en la constante aux
    const aux = el.temperament.split(", ");
    return aux;
  });

  const limparValoresUndefined = listaTemperamentos.flat().filter(Boolean); // limpio todo lo que sea null, undefine sin importar el nivel en el que este en el array
  const valoresUnicos = new Set(limparValoresUndefined); // Quito todas las repeticiones y solo dejo un valor unico
  const resultadoFinal = [...valoresUnicos]; // hago destructurin del array valores unicos y los guardo en resultadoFinal

  // Encuentro o creo en el modelo de Temperamento, cada temperamento donde el nombre sea igual al dog en el que estoy en ese momento
  resultadoFinal.forEach((el) =>
    Temperamento.findOrCreate({
      where: {
        name: el,
      },
    })
  );

  const resultado2 = await Temperamento.findAll(); // Me traigo todos los temperamentos de la base de datos
  res.send(resultado2);
};

module.exports = temperamento;
