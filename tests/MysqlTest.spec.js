const {test} = require ('@playwright/test');
require('dotenv').config();
const mysqlUtils = require('./utils/MysqlUtils');

test('Fetch data from MySQL', async () => {
  await mysqlUtils.createConnection(process.env.MYSQL_IP, process.env.MYSQL_DBNAME, process.env.MYSQL_USER, process.env.MYSQL_PASS);
  
  const results = await mysqlUtils.runQuery('SELECT * FROM patient WHERE PatNum = 1621', [1]);
  console.log(results);

  await mysqlUtils.closeConnection();
  test.expect(results.length).toBeGreaterThan(0);
  test.expect(results[0].PatNum).toBe(1621);
});
