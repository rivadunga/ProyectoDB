var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var routes = require('./routes/index');
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require("./request/request");
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()); //To allow CORS
app.use('/', routes); //Initialize / dir

if (app.get('env') === 'development')
{
    app.use(function (err, req, res, next)
    {
        res.status(err.status || 500);
        res.render('error',
        {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next)
{
    res.status(err.status || 500);
    res.render('error',
    {
        message: err.message,
        error:
        {}
    });
});


app.use(bodyParser());
app.post('/content', function (req, res)
{
    request.handleContentRequest(req, res);
});
app.listen(8080);


module.exports = app;