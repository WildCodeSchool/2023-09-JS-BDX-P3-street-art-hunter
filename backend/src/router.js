const express = require("express");
const cors = require("cors");
const multer = require("multer");

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const artistControllers = require("./controllers/artistControllers");
const {
  authMiddleware,
  authAdminMiddleware,
} = require("./middlewares/Security/auth.middlewares");
const validateUser = require("./middlewares/validateUser");
const pendingImageControllers = require("./controllers/pendingImageControllers");
const validatePendingImage = require("./middlewares/validatePendingImage");
const streetArtControllers = require("./controllers/streetArtControllers");

const router = express.Router();

const corsOrigin = "http://localhost:3000";
router.use(
  cors({
    origin: [corsOrigin],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Users

router.get("/users/me", authMiddleware, userControllers.getProfile);
router.get("/users", userControllers.browse);
router.get(
  "/users/:id",
  authMiddleware,
  authAdminMiddleware,
  userControllers.read
);
router.post("/users", validateUser, userControllers.add);
router.put("/users/:id", validateUser, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

// Login

router.post("/login", userControllers.postLogin);

// Artists

router.get("/artists", artistControllers.browse);
router.get("/artists/:id", artistControllers.read);
router.post("/artists", artistControllers.add);
router.put("/artists/:id", artistControllers.edit);
router.delete("/artists/:id", artistControllers.destroy);

// Pending Images

router.get("/admin/pendingImages", pendingImageControllers.pendingImage);
router.get("/pendingImages/:id([0-9]+)", pendingImageControllers.read);
router.post(
  "/pendingImages",
  validatePendingImage,
  pendingImageControllers.add
);
router.patch(
  "/pendingImages/status/:id([0-9]+)",
  pendingImageControllers.updateStatus
);

// Street Art

router.get("/streetArt", streetArtControllers.read);

// Import streetArtsControllers module for handling item-related operations
// const streetArtsControllers = require("./controllers/streetArtsControllers");
// // const validateUser = require("./middlewares/validateUser");

// router.get("/validateStreetArts", streetArtsControllers.browse);
// router.get("/validateStreetArts/:id", streetArtsControllers.read);
// router.post("/validateStreetArts", streetArtsControllers.add);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/uploads/"); // destination de l'upload
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single("image");

router.post("/uploads", (req, res) => {
  upload(req, res, (uploadError) => {
    if (uploadError) {
      console.error("Erreur Multer:", uploadError.message);
      return res
        .status(500)
        .json({ success: false, error: uploadError.message });
    }

    try {
      if (!req.file) {
        throw new Error("Aucun fichier téléchargé.");
      }

      const filePath = req.file.path;
      return res.status(200).json({ success: true, filePath });
    } catch (processingError) {
      console.error(
        "Erreur lors du traitement du fichier:",
        processingError.message
      );
      return res
        .status(500)
        .json({ success: false, error: processingError.message });
    }
  });
});

// Check if user admin

router.get("/admin", authMiddleware, authAdminMiddleware, (req, res) => {
  res.status(200).json({ success: true, message: "Welcome Admin" });
});

// Check if user online

router.get("/online", authMiddleware, (req, res) => {
  res.status(200).json({ success: true, message: "Welcome" });
});

/* ************************************************************************* */

module.exports = router;
