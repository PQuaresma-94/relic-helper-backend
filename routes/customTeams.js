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

// Auth Needed (To be added after the first and second stage of the project is completed)

// router.use(auth);

router.get("/", getCustomTeams);

router.get("/:teamId", validateCustomTeamId, getCustomTeam);

router.post("/", validateCustomTeamBody, createCustomTeam);

router.delete("/:teamId", validateCustomTeamId, deleteCustomTeam);

module.exports = router;
