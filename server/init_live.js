const mysql = require('mysql')
const db_conf = require('./db/live.js')
const db = mysql.createConnection(db_conf)
const db_tables = require('./db/tables.js')
const db_create = require('./db/create.js')

db.connect(err => {
  if(err){ throw err }
})

db_create(db, db_tables)