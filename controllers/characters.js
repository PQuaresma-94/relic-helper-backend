const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const getCharacters = (req, res) => {
  fetch("https://swgoh.gg/api/gl-checklist/", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};
