const tables = require("../tables");

const add = async (req, res, next) => {
  const streetArts = req.body;
  try {
    const insertId = await tables.awaiting_image.create(streetArts);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// Autres routes pour gérer les œuvres d'art de rue

module.exports = add;
