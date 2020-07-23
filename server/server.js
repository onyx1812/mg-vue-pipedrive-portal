console.log('-----------------------------');
console.log('test');
console.log('-----------------------------');

const express = require('express')
// const fs = require('fs')
const path = require('path')
const http = require('http')
const reload = require('reload')
// const ejs = require('ejs')
const port = process.env.PORT || 8089
// const history = require('connect-history-api-fallback')
const app = express()
// app.use(history())
const server = http.createServer(app)

/*-------------------------------------------
Connect DB
-------------------------------------------*/
// const mysql = require('mysql')
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'max_admin',
//   password: '9J8iak45@',
//   database: 'max_portal'
// });
// db.connect(err => {
//   if(err){ throw err }
// });

/*-------------------------------------------
Path settings
-------------------------------------------*/
// const frontPath = path.join(__dirname, '../front/dist/')
// app.set("view options", {layout: false});
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('views', path.join(frontPath));
// app.use(express.static(frontPath))
// app.use(express.json())

/*-------------------------------------------
Routing
-------------------------------------------*/
app.get('/', (req, res) => {
  res.send('Hello World!')
  // res.render(path.join(frontPath+'index.html'))
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