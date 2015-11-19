var express = require('express');
var router = express.Router();
var exportPdf = require(".././request/exportPdf.js");
var exportCsv = require(".././request/exportCsv.js");
var dashboard = require(".././request/getDashboard.js");
var sess;

router.get('/', function(req, res, next) {
    sess = req.session;
    if (sess.userId) {
        res.render('index', {
            userName: sess.userName
        });
    } else res.redirect('/login');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/logout', function(req, res, next) {
    sess = req.session;
    sess.destroy();
    res.redirect('/login');
});


router.get('/dashboard', function(req, res, next) {
    sess = req.session;
    //if (sess.userId && sess.userName == "erick")
        dashboard.handleRequest(req,res);
    //else
    //    res.redirect('/login');
});

router.get('/report', function(req, res, next) {
    sess = req.session;
    if (sess.userId && sess.userName == "erick")
        exportPdf.handleRequest(req,res);
    else
        res.redirect('/login');
});

router.get('/csv', function(req, res, next) {
    sess = req.session;
    //if (sess.userId && sess.userName == "erick")
        exportCsv.handleRequest(req,res);
    //else
    //    res.redirect('/login');
});

module.exports = router;
