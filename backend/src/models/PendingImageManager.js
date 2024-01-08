const AbstractManager = require("./AbstractManager");

class PendingImageManager extends AbstractManager {
  constructor() {
    super({ table: "pending_image" });
  }

  // Get

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT ${this.table}.id, 
              ${this.table}.user_id,
              ${this.table}.status,
              ${this.table}.img_src, 
              ${this.table}.upload_date, 
              ${this.table}.upload_time, 
              ${this.table}.street_art_id, 
              street_art.title as street_art_title, 
              street_art.author as street_art_author
      FROM ${this.table}
      LEFT JOIN street_art
      ON ${this.table}.street_art_id = street_art.id
      WHERE user_id = ?`,
      [id]
    );
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
        street_art.title as steet_art_name,
        street_art.image as street_art_image, 
        street_art.latitude as street_art_latitude, 
        street_art.longitude as steet_art_longitude,
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
    const [result] = await this.database.query(
      `INSERT INTO ${this.table}(user_id, img_src, upload_date, upload_time, latitude, longitude, street_art_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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
    return result.insertId;
  }
}

module.exports = PendingImageManager;
