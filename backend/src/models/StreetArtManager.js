const AbstractManager = require("./AbstractManager");

class StreetArtManager extends AbstractManager {
  constructor() {
    super({ table: "street_art" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select
    ${this.table}.id,
    ${this.table}.user_id,
    ${this.table}.title,
    ${this.table}.author,
    DATE_FORMAT(${this.table}.creation_date, '%d/%m/%Y') AS formattedDate,
    ${this.table}.image,
    ${this.table}.address,
    ${this.table}.latitude,
    ${this.table}.longitude
    from ${this.table}`);

  async readData(limit, offset) {
    const [rows] = await this.database.query(
      `select * from ${this.table} limit ? offset ?`,
      [+limit, +limit * +offset - +limit]
    );
    return rows;
  }

  async readSingle(id) {
    const [rows] = await this.database.query(
      `SELECT id, title, image, latitude, longitude, address, author FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0]; // Assurez-vous de retourner la première ligne du résultat, car il s'agit d'une requête pour un enregistrement unique.
  }

  // First method to update
  // async updateOne(id, streetart) {
  //   const [rows] = await this.database.query(
  //     `update ${this.table} set title = ?, image = ?, latitude = ?, longitude = ?, address = ?, author = ? where id = ?`,
  //     [
  //       streetart.title,
  //       streetart.image,
  //       streetart.latitude,
  //       streetart.longitude,
  //       streetart.address,
  //       streetart.author,
  //       id,
  //     ]
  //   );

  //   return rows;
  // }

  async updateOne(id, structure) {
    let sql = `UPDATE ${this.table} SET`;
    const sqlValues = [];
    for (const [key, value] of Object.entries(structure)) {
      sql += ` ${sqlValues.length ? "," : ""} ${key} = ?`;
      sqlValues.push(value);
    }
    sql += " WHERE id = ?";
    sqlValues.push(id);

    return this.database.query(sql, sqlValues);
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result.affectedRows;
  }

  async getStreetArts(artistId) {
    const [rows] = await this.database.query(
      `SELECT street_art.* FROM street_art
      JOIN artist_street_art ON street_art.id = artist_street_art.street_art_id
      WHERE artist_street_art.artist_id = ?`,
      [artistId]
    );
    return rows;
  }
}

module.exports = StreetArtManager;
