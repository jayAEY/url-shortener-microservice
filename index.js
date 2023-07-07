require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const isUrl = require('is-url')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

let newUrl = 0
let newUrls = {}

app.post('/api/shorturl', function(req, res) {
  newUrl += 1
  let inputUrl = req.body.url
  if(!isUrl(inputUrl)) {
   res.json({ error: 'invalid url' }) 
  }
  newUrls[newUrl] = inputUrl
   res.json({ original_url : inputUrl, short_url : newUrl});
});

app.get('/api/shorturl/:new', function(req, res) {
  let newUrl = req.params.new
   if(newUrls[newUrl] == undefined){ 
     res.json({ error: 'undefined' }) 
   }
   res.redirect(newUrls[newUrl]);
});
