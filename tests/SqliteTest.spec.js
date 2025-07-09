const {test} = require ('@playwright/test');
require('dotenv').config();
const  sqliteUtils = require('./utils/SqliteUtils').default;

test('Fetch data from SQLite', async () => {
  await sqliteUtils.createConnection();

  const results = await sqliteUtils.runQuery('SELECT * FROM patient WHERE PatNum = 1621', [1]);
  console.log(results);

  await sqliteUtils.closeConnection();
});
