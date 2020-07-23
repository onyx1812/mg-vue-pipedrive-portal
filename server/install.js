/*-------------------------------------------
Connect DB
-------------------------------------------*/
const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'apheco_admin',
  password: 'BWJL)an-H(Ml',
  database: 'apheco_portal'
});
db.connect(err => {
  if(err){ throw err }
});

/*-------------------------------------------
Create DB
-------------------------------------------*/
const db_tables = require('./db/db_tables.js')
new Promise((resolve, reject) => {
  console.log('------------------------------');
  console.log('Start...')
  console.log('');
  resolve()
})
  .then(stat => {
    db_tables(db, result => {
      if(result === 'end'){
        console.log('');
        console.log('Fnish');
        console.log('------------------------------');
        db.end();
      }
    })
  })
  .catch(err => { console.error(err) })
