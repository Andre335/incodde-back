const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const crawler = require('./crawler.routes');
// const Crawler = require('./crawler.controller.js');
const cors = require('cors');

const hostname = '127.0.0.1';
const port = 3030;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/crawler', crawler);
app.use(cors());

app.listen(port, () => console.log('Server started on port ' + port));

module.exports = app;