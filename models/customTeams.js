const mongoose = require("mongoose");
const validator = require("validator");

const unitSchema = new mongoose.Schema(
  {
    baseId: {
      type: String,
      required: true,
    },
    gearLevel: {
      type: Number,
      required: true,
    },
    relicTier: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const customTeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  requiredUnits: {
    type: [unitSchema],
    required: true,
    validate: {
      validator(units) {
        return units.length > 0;
      },
      message: "You must enter at least one unit",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CustomTeam", customTeamSchema);
