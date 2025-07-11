const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// Add to SqliteTest.js
// console.log('ALL ENVIRONMENT VARIABLES:');
// console.log(process.env);

// console.log('Environment variables:', {
//   SQLITE: process.env.SQLITE,
//   SQL_LITE: process.env.SQL_LITE,
//   url: process.env.URL,
//   dotenvConfig: require('dotenv').config()
// });

const getDbPath = () => {
    // let dbPath = process.env.SQLITE;
    // if (!dbPath) {
    //     throw new Error('SQLITE environment variable not set');
    // }

    // Remove jdbc: prefix if present and trim whitespace
    let dbPath = process.env.SQLITE.trim().replace(/^jdbc:sqlite:/, '');

    // Handle relative paths by resolving from project root
    if (!path.isAbsolute(dbPath)) {
        dbPath = path.resolve(__dirname, '..', '..', dbPath);
    }

    return dbPath;
};

const dbPath = getDbPath();
// const dbPath = '/home/su/.local/share/DBeaverData/workspace6/.metadata/sample-database-sqlite-1/Chinook.db';
console.log(`Database path resolved to: ${dbPath}`); // Debug output


class SqliteUtils {
    constructor() {
        this.db = null;
    }

    /**
     * Creates a connection to a SQLite database.
     */
    async createConnection() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
                if (err) {
                    console.error(`❌ Connection failed to SQLite DB: ${err.message}`);
                    reject(err);
                } else {
                    console.log(`✅ Connected to SQLite DB: ${dbPath}`);
                    resolve(this.db);
                }
            });
        });
    }

    /**
     * Runs a query on the connected DB.
     * @param {string} query SQL query
     * @param {array} params Query parameters
     * @returns {Promise<array>} Array of result rows
     */
    async runQuery(query, params = []) {
        if (!this.db) {
            throw new Error('Database connection is not established');
        }

        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Runs an INSERT, UPDATE, or DELETE query
     * @param {string} query SQL query
     * @param {array} params Query parameters
     * @returns {Promise<object>} Result object
     */
    async runWriteQuery(query, params = []) {
        if (!this.db) {
            throw new Error('Database connection is not established');
        }

        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ lastID: this.lastID, changes: this.changes });
                }
            });
        });
    }

    async closeConnection() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.close((err) => {
                    if (err) {
                        console.error('Error closing connection:', err);
                        reject(err);
                    } else {
                        console.log("SQL connection closed.");
                        this.db = null;
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }
}

module.exports = new SqliteUtils();