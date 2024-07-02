const { InternalServerError } = require("../utils/errors/InternalServerError");
const { NotFoundError } = require("../utils/errors/NotFoundError");

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const getAllCharacters = (req, res, next) => {
  fetch("https://swgoh.gg/api/characters", requestOptions)
    .then((response) => response.json())
    .then((characters) => {
      const getAllCharactersData = characters.map((character) => ({
        name: character.name,
        base_id: character.base_id,
        image: character.image,
      }));
      getAllCharactersData.sort((a, b) => a.name.localeCompare(b.name));
      res.send(getAllCharactersData);
    })
    .catch(() => {
      next(new InternalServerError());
    });
};

const getLegendaryCharacters = (req, res, next) => {
  fetch("https://swgoh.gg/api/gl-checklist/", requestOptions)
    .then((response) => response.json())
    .then((legendaryCharacters) => res.send(legendaryCharacters))
    .catch(() => {
      next(new InternalServerError());
    });
};

const getRequiredUnits = (req, res, next) => {
  const { baseId } = req.params;

  fetch("https://swgoh.gg/api/gl-checklist/", requestOptions)
    .then((response) => response.json())
    .then((legendaryCharacters) => {
      const character = legendaryCharacters.units.find(
        (char) => char.baseId === baseId
      );
      if (character) {
        res.send(character);
      } else {
        next(new NotFoundError("Legendary Character not found."));
      }
    })
    .catch(() => {
      next(new InternalServerError());
    });
};
module.exports = { getLegendaryCharacters, getAllCharacters, getRequiredUnits };
