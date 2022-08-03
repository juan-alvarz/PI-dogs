const { Dog } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
const router = require("../routes");
const db = require("../db.js");
const e = require("express");
const { MY_APPI_KEY } = process.env;
require("dotenv").config();

//función que consulta a la API y trae la info
const getInfo = async () => {
  const apiRes = await axios.get(
    `https://api.thedogapi.com/v1/breeds/?api_key=${MY_APPI_KEY}` //apiKey
  );
  const apiInfo = apiRes.data;
  return apiInfo;
};

const apiDog = async (req, res) => {
  try {
    let dbContent = await Dog.findAll();
    //id, name, height, weight, lifeSpan, temperament
    if (dbContent.length === 0) {
      let apiInfo = await getInfo();
      let info = apiInfo.map((el) => {
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
      for (let i = 0; i < info.length; i++) {
        const { name, height, weight, lifeSpan, temperament, image } = info[i];
        Dog.bulkCreate([
          {
            name,
            height,
            weight,
            lifeSpan,
            temperament,
            image,
          },
        ]);
        dbContent = await Dog.findAll();
      }
    }
    res.status(202).json(dbContent);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createNewDog = async (req, res) => {
  /*  - Recibe los datos recolectados desde el formulario 
  controlado de la ruta de creación de raza de perro por ->body<-
  */
  //id, name, height, weight, lifeSpan, temperament
  const { name, height, weight, lifeSpan, temperament } = req.body;
  /*- Crea una raza de perro en la base de datos relacionada con sus temperamentos */
  if (!name || !height || !weight || !lifeSpan)
    return res.status(400).json({ message: "information required" });
  await Dog.create({
    name,
    height,
    weight,
    lifeSpan,
    temperament,
    from: "DB",
  });
  return res.status(200).json(
    await Dog.findAll({
      where: {
        from: "DB",
      },
    })
  );
};

const apiNames = async (req, res) => {
  try {
    let infoApi = await getInfo();
    let info = infoApi.map((el) => {
      return {
        id: el.id,
        name: el.name,
        height: el.height.imperial,
        weight: el.weight.imperial,
        lifeSpan: el.life_span,
        temperament: el.temperament,
      };
    });
    const DogMatch = info.filter((p) =>
      p.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
    if (DogMatch.length === 0) {
      return res.status(404).json({ message: "Dog not found" });
    } else {
      return res.status(200).json(DogMatch);
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getid = async (req, res) => {
  try {
    let dbContent = await Dog.findAll();
    const IdDog = req.params.id;
    if (dbContent.length === 0) {
      let apiInfo = await getInfo();
      let info = apiInfo.map((el) => {
        return {
          id: el.id,
          name: el.name,
          height: el.height.imperial,
          weight: el.weight.imperial,
          lifeSpan: el.life_span,
          temperament: el.temperament,
        };
      });
      for (let i = 0; i < info.length; i++) {
        const { id, name, height, weight, lifeSpan, temperament } = info[i];
        await Dog.bulkCreate([
          {
            id,
            name,
            height,
            weight,
            lifeSpan,
            temperament,
          },
        ]);
      }
      let dogMatch = await Dog.findByPk(IdDog);
      if (!dogMatch) return res.status(404).json({ message: "dog not found" });
      else {
        return res.status(202).json(dogMatch);
      }
    } else {
      let dogMatch = await Dog.findByPk(IdDog);
      if (!dogMatch) {
        return res.status(404).json({ message: "dog not found" });
      } else {
        return res.status(200).json(dogMatch);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something was wrong" });
  }
};

module.exports = {
  apiDog,
  createNewDog,
  apiNames,
  getid,
};
