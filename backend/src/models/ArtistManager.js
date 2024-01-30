const AbstractManager = require("./AbstractManager");

class ArtistManager extends AbstractManager {
  constructor() {
    super({ table: "artist" });
  }

  async create(artist) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, biography, website) values (?, ?, ?)`,
      [artist.name, artist.biography, artist.website]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async readData(limit, offset) {
    const [rows] = await this.database.query(
      `select * from ${this.table} limit ? offset ?`,
      [+limit, +limit * +offset - +limit]
    );
    return rows;
  }

  async update(id, artist) {
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, biography = ?, website = ? where id = ?`,
      [artist.name, artist.biography, artist.website, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = ArtistManager;
