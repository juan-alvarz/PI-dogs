const { Router } = require("express");

const { temperamento } = require("../controllers/temperament.controller");

const router = Router();

router.get("/", temperamento);
// /temp/
module.exports = router;
