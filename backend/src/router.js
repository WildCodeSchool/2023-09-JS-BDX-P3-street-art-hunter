const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const validateUser = require("./middlewares/validateUser");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", validateUser, userControllers.add);
router.put("/users/:id", validateUser, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

/* ************************************************************************* */

module.exports = router;
