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
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ affectedRows });
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const affectedRows = await tables.users.delete(req.params.id);
    if (affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ affectedRows });
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

const getRanks = async (_, res, next) => {
  try {
    const ranks = await tables.users.getRanks();
    res.json(ranks);
  } catch (err) {
    next(err);
  }
};

const getProfile = (req, res) => {
  res.send(req.user);
};

const resetPassword = async (req, res, next) => {
  const { username, email, newPassword } = req.body;
  try {
    const user = await tables.users.findUserByUsernameAndEmail(username, email);
    if (!user) {
      res
        .status(404)
        .json({ error: "User not found with provided username and email" });
    }
    await tables.users.updatePassword(user.id, newPassword);
    res.status(200).send("Password updated");
  } catch (err) {
    next(err);
  }
};

const isUserAndMailExist = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await tables.users.findUserByUsernameAndEmail(username, email);
    if (user == null) {
      res.status(200).json({ exists: false });
    } else {
      res.status(200).json({ exists: true });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const checkUsername = async (req, res) => {
  const { username } = req.query;
  try {
    const exists = await tables.users.isUsernameExist(username);
    res.status(200).json({ exists });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const exists = await tables.users.isEmailExist(email);
    res.status(200).json({ exists });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
  postLogin,
  getRanks,
  getProfile,
  resetPassword,
  isUserAndMailExist,
  checkUsername,
  checkEmail,
};
