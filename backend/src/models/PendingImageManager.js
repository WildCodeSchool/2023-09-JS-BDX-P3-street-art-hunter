const AbstractManager = require("./AbstractManager");

class PendingImageManager extends AbstractManager {
  constructor() {
    super({ table: "pending_image" });
  }

  // Get

  async read(id) {
    let sql = `SELECT 
      ${this.table}.id, 
      ${this.table}.user_id AS userId,
      ${this.table}.status,
      ${this.table}.img_src AS imgSrc, 
      DATE_FORMAT(${this.table}.upload_date, '%d/%m/%Y') AS formattedUploadDate,
      TIME_FORMAT(${this.table}.upload_time, '%Hh%i') AS formattedUploadTime,
      ${this.table}.street_art_id, 
      street_art.title as streetArtTitle, 
      street_art.author as streetArtAuthor,
      users.points
    FROM ${this.table}
    LEFT JOIN street_art
      ON ${this.table}.street_art_id = street_art.id
      LEFT JOIN users
      ON ${this.table}.user_id = users.id
    `;

    const sqlValues = [];

    if (id) {
      sql += ` WHERE ${this.table}.user_id = ?`;
      sqlValues.push(id);
    }

    sql += ` ORDER BY ${this.table}.upload_date DESC`;

    const [rows] = await this.database.query(sql, sqlValues);
    return rows;
  }

  async readAdmin() {
    const [rows] = await this.database.query(`
      SELECT ${this.table}.id, 
        ${this.table}.user_id,
        ${this.table}.status,
        ${this.table}.img_src, 
        ${this.table}.latitude, 
        ${this.table}.longitude, 
        ${this.table}.upload_date, 
        ${this.table}.upload_time, 
        ${this.table}.street_art_id, 
        street_art.title as street_art_name,
        street_art.image as street_art_image, 
        street_art.latitude as street_art_latitude, 
        street_art.longitude as street_art_longitude,
        users.username as username
      FROM ${this.table}
      LEFT JOIN street_art
      ON ${this.table}.street_art_id = street_art.id
      LEFT JOIN users 
      ON ${this.table}.user_id = users.id
      WHERE ${this.table}.status = 'pending'`);
    return rows;
  }

  // Post

  async create(pendingImage) {
    try {
      const [result] = await this.database.query(
        `INSERT INTO ${this.table}(
          user_id,
          img_src,
          upload_date,
          upload_time,
          latitude,
          longitude,
          street_art_id,
          status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          pendingImage.userId,
          pendingImage.imgSrc,
          pendingImage.uploadDate,
          pendingImage.uploadTime,
          pendingImage.latitude,
          pendingImage.longitude,
          pendingImage.streetArtId,
          pendingImage.status,
        ]
      );

      const lastInsertId = result.insertId;

      const [newPendingImage] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE id = ?`,
        [lastInsertId]
      );

      return newPendingImage;
    } catch (error) {
      console.error("Erreur lors de la création du pendingImage:", error);
      throw error;
    }
  }

  // Patch

  async updateStatus(imageId, newStatus, userId) {
    let [result] = await this.database.query(
      `UPDATE ${this.table}
      SET status = ? 
      WHERE id = ?`,
      [newStatus, imageId]
    );

    let pointsMessage = "";

    if (result.affectedRows !== 0 && newStatus === "validate") {
      await this.database.query(
        `UPDATE users
        SET points = points + 100
        WHERE id = ?;
        `,
        [userId]
      );

      pointsMessage = "Les points de l'utilisateur ont bien été mis à jour !";
    }

    [result] = await this.database.query(
      `SELECT * 
      FROM ${this.table} 
      WHERE id = ?`,
      [imageId]
    );

    return [result, pointsMessage];
  }
}

module.exports = PendingImageManager;
