const jwt = require("jsonwebtoken");
const tables = require("../tables");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.APP_SECRET);
}

const browse = async (_, res, next) => {
  try {
    const users = await tables.users.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.users.read(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;
  try {
    const insertId = await tables.users.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const user = req.body;
  const { id } = req.params;
  try {
    const affectedRows = await tables.users.update(id, user);
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
    const affectedRows = await tables.users.delete(req.params.id);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};
const postLogin = (req, res) => {
  tables.users.login(req.body).then((user) => {
    if (user) {
      const token = generateAccessToken({
        email: user.email,
        username: user.username,
        admin: user.is_admin,
        id: user.id,
      });
      res.send({ token });
    } else {
      res.status(401).send({ error: "Identifiant incorrect!!!" });
    }
  });
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
  postLogin,
};
