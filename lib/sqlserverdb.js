const mssql = require("mssql");
const chalk = require('chalk');
const { dbConfig } = require("../config");

class SqlServerLib {
    constructor() {}

    executeSql = function(sql, callback) {
        //console.log("sql: ", sql);
        //console.log("dbConfig: ", dbConfig);

        let conn = new mssql.ConnectionPool(dbConfig);

        conn.connect()
            .then(() => {
                let req = new mssql.Request(conn);

                req
                    .query(sql)
                    .then((recordset) => {
                        callback(recordset.recordset);
                    })
                    .catch((err) => {
                        console.log(err);
                        callback(null, err);
                    });
            })
            .catch((err) => {
                console.log(err);
                callback(null, err);
            });
    };

    executeSqlAsync = async(sql) => {
        console.log(chalk.yellow("\nsql:\n", sql));

        try {
            let pool = await mssql.connect(dbConfig);
            let recordset = await pool.request().query(sql);

            return recordset.recordset;
        } catch (err) {
            console.error(`Error: ${err}`);
            throw new Error(err);
        }
    };
}

module.exports = SqlServerLib;