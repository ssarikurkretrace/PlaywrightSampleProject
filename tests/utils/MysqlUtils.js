const mysql = require('mysql2/promise');

class MysqlUtils {
  constructor() {
    this.connection = null;
  }

  /**
   * Creates a connection to a MySQL database.
   * @param {string} ip - The IP address of the MySQL server.
   * @param {string} dbName - The name of the database.
   * @param {string} user - Username.
   * @param {string} pass - Password.
   */
  async createConnection(ip, dbName, user, pass) {
    const dbUrl = {
      host: ip,
      port: 3306,
      user: user,
      password: pass,
      database: dbName,
      timezone: 'Z'
    };

    try {
      this.connection = await mysql.createConnection(dbUrl);
      console.log(`✅ Connected to MySQL DB: ${dbName}`);
    } catch (error) {
      console.error(`❌ Connection failed to ${dbName}:`, error.message);
    }
  }

  /**
   * Runs a query on the connected DB.
   * @param {string} query - SQL query to run.
   * @param {Array} params - Parameters for query (optional).
   * @returns {Array} Query results.
   */
  async runQuery(query, params = []) {
    if (!this.connection) {
      throw new Error("No DB connection. Call createConnection first.");
    }
    const [rows] = await this.connection.execute(query, params);
    return rows;
  }

  /**
   * Closes the DB connection.
   */
  async closeConnection() {
    if (this.connection) {
      await this.connection.end();
      console.log("🔌 MySQL connection closed.");
    }
  }
}

module.exports = new MysqlUtils();
