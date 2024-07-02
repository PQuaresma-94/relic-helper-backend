const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  validateCustomTeamBody,
  validateCustomTeamId,
} = require("../middlewares/validation");
const {
  getCustomTeams,
  getCustomTeam,
  createCustomTeam,
  deleteCustomTeam,
} = require("../controllers/customTeams");

// Auth Needed

router.use(auth);

router.get("/", getCustomTeams);

router.get("/:teamId", validateCustomTeamId, getCustomTeam);

router.post("/", validateCustomTeamBody, createCustomTeam);

router.delete("/:teamId", validateCustomTeamId, deleteCustomTeam);

module.exports = router;
