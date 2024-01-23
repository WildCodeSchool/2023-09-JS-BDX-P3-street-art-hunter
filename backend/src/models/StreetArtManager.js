const AbstractManager = require("./AbstractManager");

class StreetArtManager extends AbstractManager {
  constructor() {
    super({ table: "street_art" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  // First method to update
  // async update(id, streetart) {
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

  async update1(id, structure) {
    let sql = `UPDATE ${this.table} set`;
    const sqlValues = [];
    for (const [key, value] of Object.entries(structure)) {
      sql += ` ${sqlValues.length ? "," : ""} ${key} = ?`;

      sqlValues.push(value);
    }
    sql += " where id = ?";
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
