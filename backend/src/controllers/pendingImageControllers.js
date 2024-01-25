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
    const receivedImage = await tables.pending_image.create(pendingImages);
    res.status(201).json({ receivedImage });
  } catch (err) {
    next(err);
  }
};

// Patch
// Met à jour le status pour passer de en attente à valider ou refuser

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { userId, status } = req.body;

  try {
    const result = await tables.pending_image.updateStatus(id, status, userId);
    res.status(200).json(result[0] ?? {});
  } catch (error) {
    console.error('Erreur lors de la mise à jour du champ "status" :', error);
    res
      .status(500)
      .json({ error: 'Erreur lors de la mise à jour du champ "status".' });
  }
};

module.exports = {
  pendingImage,
  read,
  add,
  updateStatus,
};
