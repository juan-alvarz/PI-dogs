const { Temperamento } = require("../db.js");
const axios = require("axios");
const { MY_APPI_KEY } = process.env;
// const {Op} = require('sequelize');
require("dotenv").config();

const temperamento = async (req, res) => {
  try {
    let dbContent = await Temperamento.findAll();
    if (dbContent.length === 0) {
      const apiRes = await axios.get(
        `https://api.thedogapi.com/v1/breeds/?api_key=${MY_APPI_KEY}`
      );
      const apiInfo = apiRes.data;
      let temp = apiInfo.map((el) => {
        if (el.temperament) {
          return el.temperament.split(", ");
        }
      });
      temp = temp.flat();
      temp = temp.filter((item, index) => {
        return temp.indexOf(item) === index;
      });
      for (let i = 0; i < temp.length; i++) {
        let aux = temp[i];
        await Temperamento.bulkCreate([
          {
            name: aux,
          },
        ]);
      }
      dbContent = await Temperamento.findAll();
      return res.status(200).json(dbContent);
    } else {
      return res.status(200).json(dbContent);
    }
  } catch (error) {
    //POR SI CUALQUIER COSA SALE MAL...
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { temperamento };
