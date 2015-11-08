var express = require('express');
var router = express.Router();

var getPost = require(".././request/getPosts.js");
var saveText = require(".././request/saveText.js");
var saveImage = require(".././request/saveImage.js");


router.post('/getPosts', function (req, res)
{
    getPost.handleRequest(req, res);
});

router.post('/saveText', function (req, res)
{
    saveText.handleRequest(req, res);
});

router.post('/saveImage', function (req, res)
{
    saveImage.handleRequest(req,res);
});

router.post('/login', function (req, res)
{
    sess = req.session;
    sess.userLatitud = req.body.latitude;
    sess.userLongitude = req.body.longitude;
    console.log(req.body.latitude);
    res.send("DONE");
});


module.exports = router;
