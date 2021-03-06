const sqlite3 = require('sqlite3').verbose();

const generateQueryParams = require('./generate-query-params');
const usersSchema = require('./users-schema');

module.exports = (data, callback) => {
  // Open database connection
  const db = new sqlite3.Database('./db/users.db', (err) => {
    if (err) {
      console.error(err.message || err);
    }
    else { 
      console.log('Succesfully connected to database');
      db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users(${ usersSchema })`, (err) => {
          if (err) {
            console.error(err.message || err);
          } 
          else {
            const sqlParams = generateQueryParams(data);
            const columns = sqlParams[0];
            const values = sqlParams[1];
            // Insert data into users table
            db.run(`INSERT OR IGNORE INTO users (${ columns }) VALUES ${ values }`, (err) => {
              if (err) {
                console.error(err.message || err);
              }  
              else {
                console.log('Succcesfully inserted');
              }
            });
            // Respond to client with current table contents
            db.all('SELECT * FROM users', (err, users) => {
              if (err) {
                console.error(err.message || err);
              }
              else{
                callback(users);
              }
            });
            // Close db connection
            db.close((err) => {
              if (err) {
                console.error(err.message || err);
              }
              else {
                console.log('Close the database connection.');
              }
            })
          }
        });
      });
    }
  });
};
