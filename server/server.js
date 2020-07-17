const express = require('express')
const fs = require('fs')
const path = require('path')
const http = require('http')
const reload = require('reload')
const ejs = require('ejs')
const port = process.env.PORT || 9000
const history = require('connect-history-api-fallback')
const app = express()
app.use(history())
const server = http.createServer(app)

/*-------------------------------------------
Connect DB
-------------------------------------------*/
const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mg-vue-pipedrive-portal'
});
db.connect(err => {
  if(err){ throw err }
});

/*-------------------------------------------
Path settings
-------------------------------------------*/
const frontPath = path.join(__dirname, '../front/dist/')
app.set("view options", {layout: false});
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(frontPath));
app.use(express.static(frontPath))
app.use(express.json())

/*-------------------------------------------
Routing
-------------------------------------------*/
app.post('/api/user/', (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  const sql = `SELECT * FROM users WHERE email = "${email}" AND password = "${pass}"`;
  db.query(sql, (err, result) => {
    if(err) throw err;
    if(result.length === 0){
      res.send(false);
    } else {
      res.send(result);
    }
  });
});

app.post('/api/user/add', (req, res) => {
  const date = new Date();
  const user = {
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    city: req.body.city,
    address: req.body.address,
    registered: date
  };
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, user, (err, result) => {
    if(err){
      if( err.code == 'ER_DUP_ENTRY'){
        res.send( JSON.stringify('exist') );
      } else {
        throw err;
      }
    } else {
      // res.send( JSON.stringify(result.insertId) );
      let sql = `SELECT * FROM users WHERE ID = "${result.insertId}"`;
      db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length === 0){
          res.send(false);
        } else {
          res.send(result);
        }
      });
    }
  });
});

app.get('/', (req, res) => {
  res.render(path.join(frontPath+'index.html'))
});


/*-------------------------------------------
Server Listen
-------------------------------------------*/
reload(app).then(function (reloadReturned) {
  server.listen(port, () => {
console.log(`----------------------------------------------------------
     Server has been started on http://localhost:${port}
----------------------------------------------------------`)
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})