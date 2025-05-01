const mysql = require('mysql2/promise');
const fs = require('fs');

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

  async getQueryResultList(query) {
    const [rows] = await this.connection.execute(query);
    return rows.map(row => Object.values(row));
  }

  async getQueryResultMap(query) {
    const [rows] = await this.connection.execute(query);
    return rows;
  }

  async getCellValue(query) {
    const [rows] = await this.connection.execute(query);
    return rows.length > 0 ? Object.values(rows[0])[0] : null;
  }

  async getRowList(query) {
    const [rows] = await this.connection.execute(query);
    return rows.length > 0 ? Object.values(rows[0]) : [];
  }

  async getRowMap(query) {
    const [rows] = await this.connection.execute(query);
    return rows.length > 0 ? rows[0] : {};
  }

  async getColumnData(query, column) {
    const [rows] = await this.connection.execute(query);
    return rows.map(row => row[column]);
  }

  async getColumnStrData(query, column) {
    const [rows] = await this.connection.execute(query);
    return rows.map(row => String(row[column]));
  }

  async getColumnNames(query) {
    const [rows, fields] = await this.connection.execute(query);
    return fields.map(field => field.name);
  }

  async getRowCount(query) {
    const [rows] = await this.connection.execute(query);
    return rows.length;
  }

  async queryExecuter(query) {
    try {
      await this.connection.execute(query);
      console.log("✅ MySQL Query Executed Successfully");
    } catch (error) {
      console.error("❌ Query execution failed:", error.message);
    }
  }

  async batchQueryExecuter(queries) {
    for (const query of queries) {
      try {
        await this.connection.execute(query);
        console.log("✅ Executed:", query);
      } catch (e) {
        console.error("❌ Failed:", query, e.message);
      }
    }
  }

  async createDB(dbName) {
    await this.connection.execute(`CREATE DATABASE ${dbName}`);
    console.log(`✅ Database ${dbName} created successfully...`);
  }

  async dropDB(dbName) {
    await this.connection.execute(`DROP DATABASE ${dbName}`);
    console.log(`✅ Database ${dbName} dropped successfully...`);
  }

  async importDB(filePath) {
    try {
      const sql = fs.readFileSync(filePath, 'utf8');
      const commands = sql.split(';').filter(cmd => cmd.trim());
      for (const cmd of commands) {
        await this.connection.execute(cmd);
      }
      console.log("✅ Database imported successfully...");
    } catch (err) {
      console.error("❌ DB import failed:", err.message);
    }
  }




}

module.exports = new MysqlUtils();
