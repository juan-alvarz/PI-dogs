const { Dog } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
const router = require("../routes");
const db = require("../db.js");
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
    //id, name, height, weight, lifeSpan
    if (dbContent.length === 0) {
      let apiInfo = await getInfo();
      let info = apiInfo.map((el) => {
        return {
          id: el.id,
          name: el.name,
          height: el.height.imperial,
          weight: el.weight.imperial,
          lifeSpan: el.life_span,
        };
      });
      for (let i = 0; i < info.length; i++) {
        const { id, name, height, weight, lifeSpan } = info[i];
        Dog.bulkCreate([
          {
            id,
            name,
            height,
            weight,
            lifeSpan,
          },
        ]);
        dbContent = await Dog.findAll();
      }
    }
    res.status(202).json(dbContent);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const apiNames = async (req, res) => {
  let infoApi = await getInfo();
  let info = infoApi.map((el) => {
    return {
      id: el.id,
      name: el.name,
      height: el.height.imperial,
      weight: el.weight.imperial,
      lifeSpan: el.life_span,
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
        };
      });
      for (let i = 0; i < info.length; i++) {
        const { id, name, height, weight, lifeSpan } = info[i];
        await Dog.bulkCreate([
          {
            id,
            name,
            height,
            weight,
            lifeSpan,
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
  apiNames,
  getid,
};
