const router = require("express").Router();
const userRouter = require("./users");
const charactersRouter = require("./characters");
const customTeamsRouter = require("./customTeams");
const { auth } = require("../middlewares/auth");
const {
  validateUserInfoBody,
  validateAuthentication,
} = require("../middlewares/validation");
const { NotFoundError } = require("../utils/errors/NotFoundError");
const { createUser, login } = require("../controllers/users");

// No Auth needed

router.post("/signin", validateAuthentication, login);

router.post("/signup", validateUserInfoBody, createUser);

router.use("/characters", charactersRouter);

// To move to Auth needed when part 1 and 2 is approved

router.use("/custom-teams", /*auth , */ customTeamsRouter);

// Auth Needed

router.use("/users", auth, userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested recource not found."));
});

module.exports = router;
