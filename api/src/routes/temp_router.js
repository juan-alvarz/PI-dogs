const { Router } = require("express");
const { temperamento } = require("../controllers/temperament.controller.js");
const router = Router();

router.get("/", temperamento);

module.exports = router;
