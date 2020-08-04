'use strict'

const express = require('express')
const fs = require('fs')
const https = require('https')
const path = require('path')

const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send("Hello it's a test msg!")
});

const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
}

https.createServer(httpsOptions, app)
  .listen(port, function(){
    console.log(`https://apheco.org:${port}`)
  })