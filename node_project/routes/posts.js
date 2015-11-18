var express = require('express');
var router = express.Router();

var getPost = require(".././request/getPosts.js");
var saveText = require(".././request/saveText.js");
var saveImage = require(".././request/saveImage.js");
var login = require(".././request/login.js");
var like = require(".././request/like.js");
var follow = require(".././request/follow.js");
var getPostsInfo = require(".././request/getPostsInfo.js");
var getFriends = require(".././request/getFriends.js");
var getNotification = require(".././request/getNotification.js");

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
    follow.handleRequest(req,res);
});

router.post('/getPostsInfo', function(req, res) {
    getPostsInfo.handleRequest(req,res);
});


router.post('/getFriends', function(req, res) {
    getFriends.handleRequest(req,res);
});


router.post('/getNotifications', function(req, res) {
    getNotification.handleRequest(req,res);
});


module.exports = router;
