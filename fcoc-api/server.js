const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: "http://fcoc-ui:8080",
  origin: "http://localhost:8080"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

require('./routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
  console.log(`Server is listening to port ${PORT}`)
});
