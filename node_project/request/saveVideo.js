var multer = require('multer');
var sanitizer = require('sanitizer');
var neo4j = require("./../neo4j/Neo4JAdm.js");
var saveText = require('./saveText');

var _request;
var _result;

var _url;
var _idPost;


var saveVideo = function() {

    var query1 =
        "MATCH (p:Post) " +
        "WHERE p.id_post = #4 " +
        "CREATE (f:File { name : '#1', format : '#2', url : '#3'}) " +
        "CREATE (p)-[:TIENE]->(f)";

    query1 = query1.replace("#1", _url);
    query1 = query1.replace("#2", "video");
    query1 = query1.replace("#3", _url);
    query1 = query1.replace("#4",_idPost);

    console.log("SAVE VIDEO");
    console.log(query1);

    neo4j.getQuery(query1, function(res) {
        onSaveVideo();
    });
}

var onSaveVideo = function(res) {
    _result.send("DONE");
}


var handleRequest = function(req, res) {

    _request = req;
    _result = res;

    var sess = _request.session;
    var latitude = sess.userLatitude;
    var longitude = sess.userLongitude;
    var userId = sess.userId;

    _url = sanitizer.sanitize(req.body.content);

    if (latitude && longitude && userId) {
        saveText.savePlace(latitude, longitude, function(res) {
            saveText.saveText("", userId, latitude, longitude,
                function(res) {
                    _idPost = res[0].id_post;
                    saveVideo();
                });
        });
    } else {
        _result.send("");
    }

};

exports.handleRequest = handleRequest;
