const client = require("../../database/client");

const validatePendingImage = async (req, res, next) => {
  const errors = [];

  // Regex pour le format de l'image + Date/Heure
  const validImgSrcRegex = /^\/uploads\/.+\.jpg$/;

  const isValidDateFormat = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const isValidTimeFormat = (timeString) => {
    const regex = /^\d{2}:\d{2}:\d{2}$/;
    return regex.test(timeString);
  };

  const isValidLatitude = (latitude) => {
    const regex = /^-?\d{1,2}(?:\.\d{1,8})?$/;
    return regex.test(latitude);
  };

  const isValidLongitude = (longitude) => {
    const regex = /^-?\d{1,3}(?:\.\d{1,8})?$/;
    return regex.test(longitude);
  };

  ///

  const {
    userId,
    streetArtId,
    uploadDate,
    uploadTime,
    imgSrc,
    latitude,
    longitude,
    status,
  } = req.body;

  if (
    !userId ||
    !streetArtId ||
    !uploadDate ||
    !uploadTime ||
    !latitude ||
    !longitude
  ) {
    errors.push("Il manque certaines données.");
  }

  // userId

  if (typeof userId !== "number" || userId <= 0) {
    errors.push("L'identifiant de l'utilisateur doit être un nombre positif.");
  } else {
    try {
      const [rows] = await client.execute("SELECT id FROM users WHERE id = ?", [
        userId,
      ]);

      if (rows.length === 0) {
        errors.push("Cet utilisateur n'existe pas.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'utilisateur en bdd:",
        error
      );
      errors.push(
        "Une erreur s'est produite lors de la vérification de l'utulisateur en bdd."
      );
    }
  }

  // L'id du street-art -> Vérifie aussi s'il existe en BDD

  if (typeof streetArtId !== "number" || streetArtId <= 0) {
    errors.push("L'identifiant du street art doit être un nombre positif.");
  } else {
    try {
      const [rows] = await client.execute(
        "SELECT id FROM street_art WHERE id = ?",
        [streetArtId]
      );

      if (rows.length === 0) {
        errors.push("Ce street art n'existe pas.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification du street art de en bdd:",
        error
      );
      errors.push(
        "Une erreur s'est produite lors de la vérification du street art en bdd."
      );
    }
  }

  // Date / Hour

  if (!isValidDateFormat(uploadDate)) {
    errors.push("Format : yyyy-mm-jj.");
  }

  if (!isValidTimeFormat(uploadTime)) {
    errors.push("Format : hh:mm:ss.");
  }

  // Coords

  if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
    errors.push("Mauvaises coordonnées");
  }

  // Status

  const defaultStatus = status === null ? "pending" : status;
  const validStatusValues = ["pending", "validate", "refused"];

  if (!validStatusValues.includes(defaultStatus)) {
    errors.push("Le statut doit être 'pending', 'validate' ou 'refused'.");
  }

  // Url de l'image

  if (!validImgSrcRegex.test(imgSrc)) {
    errors.push(
      "Le lien de l'image doit commencer par /uploads et se terminer par .jpg"
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  return next();
};

module.exports = validatePendingImage;
