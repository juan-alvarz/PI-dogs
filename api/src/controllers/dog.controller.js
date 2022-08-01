const { Dog } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize"); //por si uso
const router = require("../routes"); /// las rutas del index
const db = require("../db.js");
const { restart } = require("nodemon");
require("dotenv").config();

//CORREGIR EL TEMA DEL LLAMADO A LA API
const apiDog = async (req, res) => {
  try {
    //llamado a la API DEBE IR DENTRO DEL IF!! ==========>OJOO<==============
    const apiRes = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiInfo = apiRes.data;

    var dbContent = await Dog.findAll();
    //id, name, height, weight, lifeSpan
    let info = apiInfo.map((el) => {
      return {
        id: el.id,
        name: el.name,
        height: el.height.imperial,
        weight: el.weight.imperial,
        lifeSpan: el.life_span,
      };
    });
    if (dbContent.length === 0) {
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
/* 
const data = async (req, res) => {
  const doggyData = await Dog.findAll();
  res.status(200).json(doggyData);
};
 */
const apiNames = async (req, res) => {
  const responseApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  try {
    const dogQuery = responseApi.data.filter((p) =>
      p.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
    return res.status(200).json(dogQuery);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

const getid = async (req, res) => {
  const responseApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  try {
    const dogRaza = responseApi.data.find((p) => {
      p.id === req.params.id;
    }); //req.param
    console.log(dogRaza);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

module.exports = {
  apiDog,
  apiNames,
  getid,
};
