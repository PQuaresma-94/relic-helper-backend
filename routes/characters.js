const router = require("express").Router();
const {
  getAllCharacters,
  getLegendaryCharacters,
  getRequiredUnits,
} = require("../controllers/characters");

router.get("/all", getAllCharacters);

router.get("/legendary", getLegendaryCharacters);

router.get("/legendary/:baseId", getRequiredUnits);

module.exports = router;
