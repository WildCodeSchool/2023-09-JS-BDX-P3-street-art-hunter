const tables = require("../tables");

// Get

const read = async (req, res, next) => {
  try {
    const pendingImage = await tables.pendingImages.read(req.params.id);
    if (pendingImage == null) {
      res.sendStatus(404);
    } else {
      res.json(pendingImage);
    }
  } catch (err) {
    next(err);
  }
};

// Post

const add = async (req, res, next) => {
  const pendingImage = req.body;

  try {
    const insertId = await tables.pendingImages.create(pendingImage);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
  read,
};
