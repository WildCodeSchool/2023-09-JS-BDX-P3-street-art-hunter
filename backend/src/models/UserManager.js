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
    const hash = await UserManager.hashPassword(user.password);

    const [result] = await this.database.query(
      `update ${this.table} set username = ?, email = ?, postcode = ?, city = ?, password = ? where id = ?`,
      [user.username, user.email, user.postcode, user.city, hash, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    await this.database.query(`DELETE FROM pending_image WHERE user_id = ?`, [
      id,
    ]);
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }

  async getRanks() {
    const result = await this.database.query(
      `SELECT id, username, points
      FROM ${this.table}
      ORDER BY points DESC;;`
    );
    return result;
  }

  getProfile(id) {
    return this.database.query(
      `SELECT id, email, username, postcode, city, is_admin, points FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  async findUserByUsernameAndEmail(username, email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE username = ? AND email = ?`,
      [username, email]
    );

    return rows[0];
  }

  async updatePassword(id, password) {
    const hash = await UserManager.hashPassword(password);

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET password = ? WHERE id = ?`,
      [hash, id]
    );
    return result.affectedRows;
  }

  static checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  async isEmailExist(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    return rows.length > 0;
  }

  async isUsernameExist(username) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE username = ?`,
      [username]
    );

    return rows.length > 0;
  }

  async readData(limit, offset) {
    const [rows] = await this.database.query(
      `select * from ${this.table} limit ? offset ?`,
      [+limit, +limit * +offset - +limit]
    );
    return rows;
  }
}

module.exports = UserManager;
