var express = require('express');
var router = express.Router();
var exportPdf = require(".././request/exportPdf.js");
var exportCsv = require(".././request/exportCsv.js");
var dashboard = require(".././request/getDashboard.js");
var neo4jT = require(".././request/neo4jT.js");
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
    sess = req.session;
    if (sess.userId && sess.userName){
        res.redirect('/');
    }else{
        res.render('login');
    }
});

router.get('/neo4j', function(req, res, next) {
    neo4jT.handleRequest(req,res);
});

router.get('/logout', function(req, res, next) {
    sess = req.session;
    sess.destroy();
    res.redirect('/login');
});


router.get('/dashboard', function(req, res, next) {
    dashboard.handleRequest(req,res);
});

router.get('/report', function(req, res, next) {
    exportPdf.handleRequest(req,res);
});

router.get('/csv', function(req, res, next) {
    sess = req.session;
    exportCsv.handleRequest(req,res);
});

module.exports = router;
