const router = require("express").Router();
const userRouter = require("./users");
// Add Router for Custom Team and Characters
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

// Update afer creating character controller and route
// router.use("/items", getCharacters);
// router.use("/items", getAllCharacters);

// Auth Needed

router.use("/users", auth, userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested recource not found."));
});

module.exports = router;
