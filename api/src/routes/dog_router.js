const { Router } = require("express");
const {
  apiDog,
  apiNames,
  getid,
  createNewDog,
} = require("../controllers/dog.controller");

const router = Router();

router.get("/dogs", apiDog);
router.post("/dogs");
router.get("/dogsName", apiNames);
router.post("/dogs", createNewDog);
router.get("/dogs/:id", getid);

module.exports = router;
