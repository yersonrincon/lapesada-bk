const mssql = require("mssql");
const chalk = require('chalk');
const { dbConfig } = require("../config");

class SqlServerLib {
    constructor() {}
    executeSqlAsync = async(sql) => {
        const client = new Client(dbConfig);

        try {

            await client.connect();
            let recordset = await client.query(sql);
            client.end();
            return recordset;

        } catch (err) {
            console.error(`Error: ${err}`);
            client.end();
            throw new Error(err);
        }

    }
  

    /*executeSqlAsync = async(sql) => {
        console.log(chalk.yellow("\nsql:\n", sql));

        try {
            let pool = await mssql.connect(dbConfig);
            let recordset = await pool.request().query(sql);

            return recordset.recordset;
        } catch (err) {
            console.error(`Error: ${err}`);
            throw new Error(err);
        }
    };*/
}

module.exports = SqlServerLib;