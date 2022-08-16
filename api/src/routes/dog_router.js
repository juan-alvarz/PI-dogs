const { Router } = require("express");
const {
  apiDog,
  apiNames,
  createNewDog,
  getId,
} = require("../controllers/dog.controller");

const router = Router();

router.get("/dogs", apiDog);
router.get("/dogsName", apiNames);
router.post("/dogs", createNewDog);
router.get("/dogs/:id", getId);

module.exports = router;
