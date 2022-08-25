require('dotenv').config();
const express = require('express')
const hbs = require('hbs');
const app = express()
const Server = require('./models/server')

const server = new Server();
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
server.listen();