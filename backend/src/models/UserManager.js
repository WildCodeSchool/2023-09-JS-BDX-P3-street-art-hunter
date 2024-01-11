const bcrypt = require("bcrypt");

const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  async create(user) {
    const hash = await UserManager.hashPassword(user.password);

    const [result] = await this.database.query(
      `insert into ${this.table} (username, email, postcode, city, password) values (?, ?, ?, ?, ?)`,
      [user.username, user.email, user.postcode, user.city, hash]
    );

    return result.insertId;
  }

  async login({ username, password }) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where  username = ? or email = ?`,
      [username, username]
    );

    if (!rows.length) {
      return undefined;
    }

    const user = rows[0];
    const result = await bcrypt.compare(password, user.password);
    return result ? user : undefined;
  }

  static hashPassword(password, workFactor = 5) {
    return bcrypt.hash(password, workFactor);
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

  getProfile(id) {
    return this.database.query(
      `SELECT id, email, is_admin AS isAdmin FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = UserManager;
