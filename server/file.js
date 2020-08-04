const
  fs = require('fs'),
  path = require('path'),
  express = require("express"),
  app = express(),
  http = require("http").Server(app).listen(8088),
  upload = require("express-fileupload"),
  request = require("request"),
  api_token = '67a36030ab687236cf7250283f5cb55170df2e88',
  api_url = "https://purpceadlab.pipedrive.com/api/v1/",
  frontPath = path.join(__dirname, '../front/dist/');

app.use(upload());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/file', (req, res) => {
  res.render(path.join(frontPath+'file.html'))
});
app.post('/file', (req, res) => {
  if(req.files){
    const
      file = req.files.filename,
      filename = req.files.name;
    file.mv("./upload/"+filename, err => {
      if(err){
        console.log(err);
        res.send("error occured")
      } else {
        res.send("Done!")
      }
    })
  }
});