const jwt = require("jsonwebtoken");
const models = require("../../tables");

const authMiddleware = (req, res, next) => {
  // Step 1: denied access without token
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Non-existent token" });
  }

  // Step 2: verify token then set user data in req
  return jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.APP_SECRET,
    (err, data) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }
      // Step 3: get user data from token payload
      models.users.getProfile(data.id).then(([rows]) => {
        if (!rows.length) {
          return res.status(401).json({ error: "No matching token" });
        }
        // Step 4: share user data between different middlewares
        // eslint-disable-next-line prefer-destructuring
        req.user = rows[0];
        return next();
      });
      return null;
    }
  );
};

const authAdminMiddleware = (req, res, next) => {
  if (req?.user?.isAdmin !== 1) {
    return res.status(403).json({ error: "User not admin" });
  }

  return next();
};

module.exports = { authMiddleware, authAdminMiddleware };
