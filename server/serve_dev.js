const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const md5_hash = md5('!@#$%^&*()_+');
const cors = require('cors');
const path = require('path')
const http = require('http')
const reload = require('reload')
const port = process.env.PORT || 8000
const app = express()
const server = http.createServer(app)

const request = require("request");
const api_token = '67a36030ab687236cf7250283f5cb55170df2e88';
const api_url = "https://purpceadlab.pipedrive.com/api/v1/";

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

/*-------------------------------------------
Connect DB
-------------------------------------------*/
const mysql = require('mysql')
const db_conf = require('./db/dev.js')
const db = mysql.createConnection(db_conf)
db.connect(err => {
  if(err){ throw err }
})

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
app.get('/api/user/', (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  const password_md5 = md5(req.query.password+md5_hash);
  const sql = `SELECT * FROM users WHERE email = "${email}" AND password = "${password_md5}"`;
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.get('/api/register/', (req, res) => {
  //create user from registration
  request.post({
    url: `${api_url}/users?api_token=${api_token}`,
    formData: {
      "name": req.query.name,
      "email": req.query.email,
      "phone": req.query.phone,
      "active_flag": "true"
  }}, (err, resp, body) => {
    if(err){
      console.error(err);
    } else {
      const owner = JSON.parse(body);
      const password_md5 = md5(req.query.password+md5_hash);
      const date = new Date();
      const user = {
        password: password_md5,
        name: req.query.name,
        email: req.query.email,
        phone: req.query.phone,
        country: req.query.country,
        city: req.query.city,
        address: req.query.address,
        owner_id: owner.data.id,
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
    }
  });
});



app.get('/api/deals/', (req, res) => {
  let org_id, person_id, owner_id = Number(req.query.owner_id);

  request.post({ //---------------------------------------------create organization
    url: `${api_url}/organizations?api_token=${api_token}`,
    formData: {
      "name": req.query.name,
      "owner_id": owner_id
  }}, (err, resp, body) => {
    let org = JSON.parse(body);
    org_id = Number(org.data.id);

    if(org.success){
      let person_email = [req.query.email];
      let person_phone = [req.query.phone];
      request.post({ //-----------------------------------------create person
        url: `${api_url}/persons?api_token=${api_token}`,
        formData: {
          "name": req.query.name,
          "email": person_email,
          "phone": person_phone,
          "owner_id": owner_id
      }}, (err, resp, body) => {
        let person = JSON.parse(body);
        person_id = person.data.id;

        if(person.success){
          request.post({ //-------------------------------------create deal
            url: `${api_url}/deals?api_token=${api_token}`,
            formData: {
              "title": req.query.title,
              "value": req.query.offer_cost,
              "user_id": owner_id,
              "person_id": Number(person_id),
              "org_id": Number(org_id)
          }}, (err, resp, body) => {
            if(err){
              console.error(err);
              res.send(err);
            } else {
              let deal = JSON.parse(body);
              res.send(deal);
            }
          });
        }
      });
    }

  });

});


app.get('/', (req, res) => {
  res.render(path.join(frontPath+'index.html'))
});

app.get('/api/test', (req, res) => {
  res.send("Hello it's a test msg!")
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