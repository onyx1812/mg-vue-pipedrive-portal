const mysql = require('mysql')
const db_conf = require('./db/dev.js')
const db = mysql.createConnection(db_conf)
db.connect(err => {
  if(err){ throw err }
})

const db_tables = require('./db/tables.js')
const db_create = require('./db/create.js')
db_create(db, db_tables)