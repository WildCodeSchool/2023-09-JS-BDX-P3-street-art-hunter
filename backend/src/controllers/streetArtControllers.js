const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    const result = await tables.street_art.readAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const affectedRows = await tables.street_art.delete(req.params.id);
    if (affectedRows === 0) {
      res.status(404).json({ error: "Aucun street art trouvé avec cet ID." });
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error("Erreur dans la fonction destroy:", err);
    next(err);
  }
};
module.exports = { read, destroy };
