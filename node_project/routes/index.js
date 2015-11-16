var express = require('express');
var router = express.Router();
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

module.exports = router;
