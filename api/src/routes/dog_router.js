const { Router } = require("express");
const {
  apiDog,
  apiNames,
  getid,
  data,
} = require("../controllers/dog.controller");

const router = Router();

router.get("/dogs", apiDog);
router.get("/dogsName", apiNames);
router.get("/dogs/:id", getid);

module.exports = router;
