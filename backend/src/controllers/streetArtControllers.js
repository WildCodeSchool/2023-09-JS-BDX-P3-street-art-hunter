const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    const result = await tables.street_art.readAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const readOne = async (req, res, next) => {
  try {
    const result = await tables.street_art.readSingle(req.params.id);
    if (result === 0) {
      res.status(404).json({ error: "Aucun street art trouvé avec cet ID." });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    console.error("Erreur dans la fonction readOne:", err);
    next(err);
  }
};

const edit = async (req, res, next) => {
  const art = req.body;
  const { id } = req.params;
  try {
    const affectedRows = await tables.street_art.updateOne(id, art);

    if (affectedRows === 0) {
      res.status(404).json({ message: "error in edit route" });
    } else {
      res.sendStatus(200);
    }
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

const readStreetArt = async (req, res, next) => {
  const { artistId } = req.params;
  try {
    const affectedRows = await tables.street_art.getStreetArts(artistId);
    res.json(affectedRows);
    if (affectedRows === 0) {
      res.status(404).json({ error: "Artist not found" });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { read, edit, destroy, readOne, readStreetArt };
