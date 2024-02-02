const tables = require("../tables");

const browse = async (_, res, next) => {
  try {
    const artists = await tables.artist.readAll();
    res.json(artists);
  } catch (err) {
    next(err);
  }
};

const browseData = async (req, res, next) => {
  const limit = +req.query.limit || 10;
  const offset = +req.query.offset || 1;
  try {
    const artists = await tables.artist.readData(limit, offset);
    res.json(artists);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const artist = await tables.artist.read(req.params.id);
    if (artist == null) {
      res.status(404).json({ error: "Artist not found" });
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
      res.status(404).json({ error: "Artist not found" });
    } else {
      res.status(200).json({ affectedRows });
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const affectedRows = await tables.artist.delete(req.params.id);
    if (affectedRows === 0) {
      res.status(404).json({ error: "Artist not found" });
    } else {
      res.status(200).json({ affectedRows });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  browseData,
  read,
  edit,
  add,
  destroy,
};
