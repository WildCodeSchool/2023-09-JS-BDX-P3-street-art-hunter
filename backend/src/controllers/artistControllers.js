const tables = require("../tables");

const browse = async (_, res, next) => {
  try {
    const artists = await tables.artist.readAll();
    res.json(artists);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const artist = await tables.artist.read(req.params.id);
    if (artist == null) {
      res.sendStatus(404);
    } else {
      res.json(artist);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const artist = req.body;
  try {
    const insertId = await tables.artist.create(artist);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const artist = req.body;
  const { id } = req.params;
  try {
    const affectedRows = await tables.artist.update(id, artist);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const affectedRows = await tables.artist.delete(req.params.id);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
