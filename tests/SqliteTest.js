// import { test } from '@playwright/test';
require('dotenv').config();
const db = require('./utils/SqliteUtils');

async function testConnection() {
    try {
        await db.createConnection();
        const artists = await db.runQuery('SELECT * FROM Artist LIMIT 5');
        console.log(artists);
        
        const result = await db.runWriteQuery(
            'INSERT INTO table (column) VALUES (?)', 
            ['value']
        );
        console.log(result);
    } finally {
        await db.closeConnection();
    }
}

testConnection();
