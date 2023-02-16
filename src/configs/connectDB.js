// get the client
import mysql from 'mysql2/promise';

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbase'
});

// simple query
// pool.query(
//   'SELECT * FROM `users`', (err, results, fields) => {
//     console.log('>>> check mysql');
//     console.log(results); // results contains rows returned by server
//   }
// );

export default pool;