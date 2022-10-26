const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const express = require('express');
const volleyball = require('volleyball');
const compression = require('compression');

const routes = require('./routes');

const app = express();

// set security HTTP headers
app.use(helmet());

//http logger
app.use(volleyball);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/', routes);

module.exports = app;
