const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || !email || !password) {
    errors.push("Please enter all fields");
  }
  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Please enter a valid email" });
  }
  if (password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  }
  if (username.length > 20) {
    errors.push({
      field: "username",
      message: "Username must be less than 20 characters",
    });
  }

  if (errors.length > 0) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateUser;
