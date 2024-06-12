const CustomTeam = require("../models/customTeams");
const { BadRequestError } = require("../utils/errors/BadRequestError");
const { ForbiddenError } = require("../utils/errors/ForbiddenError");
const { NotFoundError } = require("../utils/errors/NotFoundError");
const { InternalServerError } = require("../utils/errors/InternalServerError");
const { error } = require("winston");

// GET custom teams
const getCustomTeams = (req, res, next) => {
  const userId = req.user._id;

  CustomTeam.find({ owner: userId })
    .then((teams) => res.send(teams))
    .catch((err) => {
      console.error(err);
      next(new InternalServerError());
    });
};

// GET custom teams by id
const getCustomTeam = (req, res, next) => {
  const { teamId } = req.params;
  const userId = req.user._id;

  CustomTeam.findById(teamId)
    .orFail(() => {
      throw new NotFoundError("Custom team not found");
    })
    .then((team) => {
      if (!team.owner.equals(userId)) {
        throw new ForbiddenError(
          "You do not have permission to see this team."
        );
      }
      res.status(200).send(team);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "NotFoundError" || err.name === "ForbiddenError") {
        next(err);
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(new InternalServerError());
      }
    });
};

// POST custom team
const createCustomTeam = (req, res, next) => {
  const { name, image, requiredUnits } = req.body;
  const userId = req.user._id;

  CustomTeam.create({ name, image, requiredUnits, owner: userId })
    .then((team) => res.status(201).send(team))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(new InternalServerError());
      }
    });
};

// DELETE custom team
const deleteCustomTeam = (req, res, next) => {
  const { teamId } = req.params;
  const userId = req.user._id;

  CustomTeam.findById(teamId)
    .orFail(() => {
      throw new NotFoundError("Custom team not found");
    })
    .then((team) => {
      if (!team.owner.equals(userId)) {
        throw new ForbiddenError(
          "You do not have permission to delete this team."
        );
      }
      return team.deleteOne().then(() => {
        res
          .status(200)
          .send({ message: "Custom team was deleted successfully" });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "NotFoundError" || err.name === "ForbiddenError") {
        next(err);
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports = {
  getCustomTeams,
  getCustomTeam,
  createCustomTeam,
  deleteCustomTeam,
};
