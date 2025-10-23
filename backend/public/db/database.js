
const mysql = require('mysql');



const dbConfig = {
    connectionLimit: 10, 
    host: 'localhost',  // 127.0.0.1 PORT to point in your working remote server
    user: 'root',
    password: '',
    database: 'admin_db' // name this base on your db
};

const pool = mysql.createPool(dbConfig);


function executeQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (error, results) => {
                connection.release(); 
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    });        
}



function insertQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (error, results) => {
                connection.release(); 
                if (error) {
                    reject(error);
                } else {
                    resolve({ id: results.insertId });
                }
            });
        });
    });
}

module.exports = {
    executeQuery,
    insertQuery
};