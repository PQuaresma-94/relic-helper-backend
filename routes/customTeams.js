const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  validateCustomTeamBody,
  validateCustomTeamId,
} = require("../middlewares/validation");
const {
  getCustomTeams,
  createCustomTeam,
  deleteCustomTeam,
} = require("../controllers/customTeams");

router.get("/", getCustomTeams); // move to Auth after checking teams

// Auth Needed

router.use(auth);

router.post("/", validateCustomTeamBody, createCustomTeam);

router.delete("/:teamId", validateCustomTeamId, deleteCustomTeam);

module.exports = router;
