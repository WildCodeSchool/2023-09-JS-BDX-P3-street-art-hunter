const express = require("express");
const cors = require("cors");
const multer = require("multer");

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

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const artistControllers = require("./controllers/artistControllers");
const validateUser = require("./middlewares/validateUser");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", validateUser, userControllers.add);
router.put("/users/:id", validateUser, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

router.post("/login", userControllers.postLogin);

router.get("/artists", artistControllers.browse);
router.get("/artists/:id", artistControllers.read);
router.post("/artists", artistControllers.add);
router.put("/artists/:id", artistControllers.edit);
router.delete("/artists/:id", artistControllers.destroy);

// Import streetArtsControllers module for handling item-related operations
// const streetArtsControllers = require("./controllers/streetArtsControllers");
// // const validateUser = require("./middlewares/validateUser");

const pendingImageControllers = require("./controllers/pendingImageControllers");
const validatePendingImage = require("./middlewares/validatePendingImage");

router.get("/admin/pendingImages", pendingImageControllers.pendingImage);
router.get("/pendingImages/:id", pendingImageControllers.read);
router.post(
  "/pendingImages",
  validatePendingImage,
  pendingImageControllers.add
);

// Uploads

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // destination de l'upload
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

/* ************************************************************************* */

module.exports = router;
