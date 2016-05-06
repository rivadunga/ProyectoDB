var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var posts = require('./routes/posts');
var session = require('express-session');
var neo4j = require('neo4j');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// BLUEMIX
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
{
    secret: '1234567890'
})); //Session
app.use('/', routes); //Initialize / redirect
app.use('/', posts); //Initialize / posts


module.exports = app;
