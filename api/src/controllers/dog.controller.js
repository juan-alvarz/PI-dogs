const { Dog } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize"); //por si uso
const router = require("../routes"); /// las rutas del index
require("dotenv").config();

const apiDogs = async (req, res) => {
  const responseApi = await axios.get("https://api.thedogapi.com/v1/breeds");

  const responseInfo = await responseApi.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      height: e.height.imperial,
      weight: e.weight.imperial,
      lifeSpan: e.life_span,
    };
  });

  return res.status(200).send(responseInfo);
};

const apiNames = async (req, res) => {
  const responseApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  try {
    const dogQuery = responseApi.data.filter((p) =>
      p.name.includes(req.query.name)
    );

    return res.status(200).json(dogQuery);
  } catch (error) {
    return res.status(404).json({ message: error });
  }

  //     [ ] GET /dogs/{idRaza}:
  // Obtener el detalle de una raza de perro en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
  // Incluir los temperamentos asociados
};

module.exports = {
  apiDogs,
  apiNames,
};
