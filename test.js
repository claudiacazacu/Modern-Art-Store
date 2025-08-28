const db = require('./db');

db.any('SELECT NOW()')
  .then(data => {
    console.log('Connected at:', data);
  })
  .catch(error => {
    console.error('Error connecting:', error);
  });
