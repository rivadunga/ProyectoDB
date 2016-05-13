var express = require('express');
var getIndex = require(".././request/getIndex.js");
var router = express.Router();
var sess;

router.get('/', function(req, res, next) {
    sess = req.session;
    if (sess.userId) {
        getIndex.handleRequest(req,res);
    } else res.redirect('/login');
});

router.get('/login', function(req, res, next) {
    sess = req.session;
    if (sess.userId && sess.userName) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.get('/signup', function(req, res, next) {
    sess = req.session;
    if (sess.userId && sess.userName){
        res.redirect('/');
    }else{
        res.render('signup');
    }
});


router.get('/logout', function(req, res, next) {
    sess = req.session;
    sess.destroy();
    res.redirect('/login');
});

module.exports = router;
