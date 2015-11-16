var express = require('express');
var router = express.Router();

var getPost = require(".././request/getPosts.js");
var saveText = require(".././request/saveText.js");
var saveImage = require(".././request/saveImage.js");
var login = require(".././request/login.js");
var like = require(".././request/like.js");

router.post('/getPosts', function(req, res) {
    getPost.handleRequest(req, res);
});

router.post('/saveText', function(req, res) {
    saveText.handleRequest(req, res);
});

router.post('/saveImage', function(req, res) {
    saveImage.handleRequest(req, res);
});

router.post('/login', function(req, res) {
    login.handleRequest(req, res);
});

router.post('/like', function(req, res) {
    like.handleRequest(req,res);
});

router.post('/follow', function(req, res) {
    res.send(req.body.idUser)
});



module.exports = router;
