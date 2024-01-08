const tables = require("../tables");

// Get

const pendingImage = async (_, res, next) => {
  try {
    const pendingImages = await tables.pending_image.readAdmin();
    res.json(pendingImages);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const pendingImages = await tables.pending_image.read(req.params.id);
    if (pendingImages == null) {
      res.sendStatus(404);
    } else {
      res.json(pendingImages);
    }
  } catch (err) {
    next(err);
  }
};

// Post

const add = async (req, res, next) => {
  const pendingImages = req.body;

  try {
    const insertId = await tables.pending_image.create(pendingImages);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  pendingImage,
  read,
  add,
};
