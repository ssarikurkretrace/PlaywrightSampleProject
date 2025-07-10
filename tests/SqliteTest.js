// import { test } from '@playwright/test';
require('dotenv').config();
const db = require('./utils/SqliteUtils');

async function testConnection() {
    try {
        await db.createConnection();
        const artists = await db.runQuery('SELECT * FROM Artist LIMIT 5');
        console.log(artists);

    } finally {
        await db.closeConnection();
    }
}

testConnection();
