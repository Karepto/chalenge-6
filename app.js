require('dotenv').config();
var express = require('express');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(express.json());

const routes = require('./routes');
app.use('/api/v1', routes);

// 500 error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

// 404 error handler
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `are you lost? ${req.method} ${req.url} is not registered!`,
        data: null
    });
});

module.exports = app;
