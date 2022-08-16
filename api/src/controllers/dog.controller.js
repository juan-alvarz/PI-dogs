const { Dog } = require("../db.js");
const axios = require("axios");
const { MY_APPI_KEY } = process.env;
require("dotenv").config();

//función que consulta a la API y trae la info
const getInfo = async () => {
  const apiRes = await axios.get(
    `https://api.thedogapi.com/v1/breeds/?api_key=${MY_APPI_KEY}` //apiKey
  );
  globalThis.dbContenido = apiRes.data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      height: el.height.metric,
      weight: el.weight.metric,
      lifeSpan: el.life_span,
      temperament: el.temperament,
      image: el.image.url,
    };
  });
};
//lama la API y crea una variable global para agilizar el proceso
getInfo();

const apiDog = async (req, res) => {
  try {
    let content = dbContenido;
    return res.status(202).json(content);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createNewDog = async (req, res) => {
  try {
    const { name, height, weight, lifeSpan, temperament, image } = req.body;
    /*- Crea una raza de perro en la base de datos relacionada con sus temperamentos */
    if (!name || !weight || !temperament)
      return res.status(400).json({ message: "information required!" });
    await Dog.create({
      name,
      height,
      weight,
      lifeSpan,
      image,
      temperament,
    });
    let dbDog = await Dog.findAll();
    let dbDogLength = Object.keys(dbDog).length; // {} => longitud === 0
    if (dbDogLength !== 0) {
      let hash = {}; //evitar que se clonen perros
      dbContenido = dbContenido.concat(dbDog);
      dbContenido = dbContenido.filter((p) =>
        hash[p.id] ? false : (hash[p.id] = true)
      );
    }
    return res.status(200).send("perro creado con exito");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const apiNames = async (req, res) => {
  try {
    let dogName = req.query.name;
    let content = dbContenido;
    let dogMatched = content.filter((p) =>
      p.name.toLowerCase().includes(dogName.toLowerCase())
    );
    let dogMatchedLength = Object.keys(dogMatched).length;
    if (dogMatchedLength === 0)
      return res.status(404).json({ message: "Dog not found :(" });
    return res.status(200).json(dogMatched);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getId = async (req, res) => {
  try {
    let content = dbContenido;
    let dogMatch = content.find((p) => p.id.toString() === req.params.id);
    if (!dogMatch) return res.status(404).json({ message: "dog not found" });
    return res.status(200).json(dogMatch);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  apiDog,
  createNewDog,
  apiNames,
  getId,
};
