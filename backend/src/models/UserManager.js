const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (username, email, postcode, city, password) values (?, ?, ?, ?, ?)`,
      [
        user.username,
        user.email,
        user.postcode,
        user.city,
        user.password,
        user.points,
        user.is_admin,
      ]
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

  async update(id, user) {
    const [result] = await this.database.query(
      `update ${this.table} set username = ?, email = ?, postcode = ?, city = ?, password = ?, points = ?, is_admin = ? where id = ?`,
      [
        user.username,
        user.email,
        user.postcode,
        user.city,
        user.password,
        user.points,
        user.is_admin,
        id,
      ]
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

module.exports = UserManager;
