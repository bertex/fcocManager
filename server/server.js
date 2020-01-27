//server.js
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./routes')(app);

const PORT = 3000;
app.listen(PORT,() => {
  console.log(`Server is listening to port ${PORT}`)
});


