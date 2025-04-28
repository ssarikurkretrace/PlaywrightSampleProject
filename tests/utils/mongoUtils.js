const { MongoClient } = require('mongodb');

class MongoUtils {
  constructor(uri, dbName) {
    this.uri = uri || process.env.MONGO_URI;
    this.dbName = dbName;
    this.client = null;
    this.db = null;
  }

  async connect() {
    if (!this.uri) throw new Error("Mongo URI is not provided.");
    if (!this.client) {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log("✅ Connected to MongoDB:", this.dbName);
    }
  }

  getCollection(collectionName) {
    if (!this.db) {
      throw new Error("Database connection is not initialized. Call connect() first.");
    }
    return this.db.collection(collectionName);
  }

  async close() {
    if (this.client) {
      await this.client.close();
      console.log("🔌 MongoDB connection closed");
      this.client = null;
      this.db = null;
    }
  }
}

module.exports = MongoUtils;

