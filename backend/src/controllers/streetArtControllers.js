const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    const streetArt = await tables.street_art.readAll();
    res.json(streetArt);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const modifyArt = await tables.street_art.update();
    res.json(modifyArt);
  } catch (err) {
    next(err);
  }
};

module.exports = { read, edit };
