const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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
router.get(
  "/users",
  authMiddleware,
  authAdminMiddleware,
  userControllers.browse
);
router.get(
  "/users/:id",
  authMiddleware,
  authAdminMiddleware,
  userControllers.read
);
router.post("/users", validateUser, userControllers.add);
router.put("/users/:id", authMiddleware, validateUser, userControllers.edit);
router.delete("/users/:id", authMiddleware, userControllers.destroy);
router.get("/ranks", userControllers.getRanks);

router.post("/reset-password", userControllers.resetPassword);
router.post("/check-user-and-mail", userControllers.isUserAndMailExist);

router.get("/check-username", userControllers.checkUsername);
router.get("/check-email", userControllers.checkEmail);

// Login

router.post("/login", userControllers.postLogin);

// Artists

router.get("/artists", artistControllers.browse);
router.get("/artists/data", artistControllers.browseData);
router.get("/artists/:id", artistControllers.read);
router.post(
  "/artists",
  authMiddleware,
  authAdminMiddleware,
  artistControllers.add
);
router.put(
  "/artists/:id",
  authMiddleware,
  authAdminMiddleware,
  artistControllers.edit
);
router.delete(
  "/artists/:id",
  authMiddleware,
  authAdminMiddleware,
  artistControllers.destroy
);

// Pending Images

router.get(
  "/admin/pendingImages",
  authMiddleware,
  authAdminMiddleware,
  pendingImageControllers.pendingImage
);
router.get("/pendingImages", authMiddleware, pendingImageControllers.read);
router.post(
  "/pendingImages",
  authMiddleware,
  validatePendingImage,
  pendingImageControllers.add
);
router.patch(
  "/pendingImages/status/:id([0-9]+)",
  authMiddleware,
  authAdminMiddleware,
  pendingImageControllers.updateStatus
);

// Street Art

router.get("/streetart", streetArtControllers.read);
router.get("/streetart/data", streetArtControllers.readData);
router.get(
  "/streetart/:id",
  authMiddleware,
  authAdminMiddleware,
  streetArtControllers.readOne
);
router.put(
  "/streetart/:id",
  authMiddleware,
  authAdminMiddleware,
  streetArtControllers.edit
);
router.delete(
  "/streetart/:id",
  authMiddleware,
  authAdminMiddleware,
  streetArtControllers.destroy
);
router.get(
  "/streetart/artists/:artistId([0-9]+)",
  streetArtControllers.readStreetArt
);

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

const upload = multer({ storage });

router.post("/uploads", authMiddleware, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Aucun fichier téléchargé.");
    }

    const originalFilename = req.file.filename;
    const filePath = req.file.path.replace(
      originalFilename,
      `${new Date().getTime()}-${originalFilename}`
    );

    // Obtient un chemin relatif sans le préfixe "public/" et remplace les "\" par "/"
    const relativePath = path.relative("public", filePath).replace(/\\/g, "/");

    fs.rename(req.file.path, filePath, (renameError) => {
      if (renameError) {
        console.error(
          "Erreur lors du renommage du fichier:",
          renameError.message
        );
        return res
          .status(500)
          .json({ success: false, error: renameError.message });
      }

      return res.status(200).json({ success: true, filePath: relativePath });
    });
  } catch (processingError) {
    console.error(
      "Erreur lors du traitement du fichier:",
      processingError.message
    );
    return res
      .status(500)
      .json({ success: false, error: processingError.message });
  }
  return null;
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
