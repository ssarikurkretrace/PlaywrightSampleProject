const sqlite3 = require('sqlite3').verbose();
const dbUrl = {
    filename: process.env.SQL_LITE,
    mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
};

class SqliteUtils {

    constructor() {
        this.connection = null;
    }
    /**
     * Creates a connection to a SQLite database.
     */
    async createConnection() {
        return new Promise((resolve, reject) => {
            this.connection = new sqlite3.Database(dbUrl.filename, dbUrl.mode, (err) => {
                if (err) {
                    console.error(`❌ Connection failed to SQLite DB: ${err.message}`);
                    reject(err);
                } else {
                    console.log(`✅ Connected to SQLite DB: ${dbUrl.filename}`);
                    resolve(this.connection);
                }
            });
        });
    }

    // ** runs a query on the connected DB.
    async runQuery(query, params = []) {
        if (!this.connection) {
            throw new Error('Database connection is not established');
        }

    const [rows] = await this.connection.execute(query, params);
    return rows;


    }

}
module.exports = new SqliteUtils();
