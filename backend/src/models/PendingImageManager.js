const AbstractManager = require("./AbstractManager");

class PendingImageManager extends AbstractManager {
  constructor() {
    super({ table: "pendingImages" });
  }

  // Get

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM pending_image WHERE user_id = ?`,
      [id]
    );
    return rows;
  }

  // Post

  async create(pendingImage) {
    const [result] = await this.database.query(
      "INSERT INTO pending_image(user_id, img_src, upload_date, upload_time, latitude, longitude, street_art_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        pendingImage.userId,
        pendingImage.imgSrc,
        pendingImage.uploadDate,
        pendingImage.uploadTime,
        pendingImage.latitude,
        pendingImage.longitude,
        pendingImage.streetArtId,
      ]
    );
    return result.insertId;
  }
}

module.exports = PendingImageManager;
