var multer = require('multer');
var sanitizer = require('sanitizer');
var neo4j = require("./../neo4j/Neo4JAdm.js");
var saveText = require('./saveText');

var _request;
var _result;

var _fileName;
var _encode;
var _idPost;


var saveImage = function() {

    var query1 =
        "MATCH (p:Post) " +
        "WHERE p.id_post = #4 " +
        "CREATE (f:File { name : '#1', format : '#2', url : '/user-content/#3'}) " +
        "CREATE (p)-[:TIENE]->(f)";

    query1 = query1.replace("#1", _fileName);
    query1 = query1.replace("#2", _encode);
    query1 = query1.replace("#3", _fileName);
    query1 = query1.replace("#4",_idPost);

    console.log("SAVE IMAGE");
    console.log(query1);

    neo4j.getQuery(query1, function(res) {
        onSaveImage();
    });
}

var onSaveImage = function(res) {
    _result.send("DONE");
}


var upload = multer({
    dest: 'public/user-content/',
    rename: function(fieldname, filename) {
        return "UIMG" + filename + Date.now();
    },
    onFileUploadComplete: function(file) {
        var path = file.path;
        _fileName = path.substring(path.lastIndexOf("UIMG"));
        _encode = file.mimetype;
        onUploadImage();
    }
});


var onUploadImage = function() {
    var sess = _request.session;
    var latitude = sess.userLatitude;
    var longitude = sess.userLongitude;
    var userId = sess.userId;
    var content = 1;

    if (latitude && longitude && userId && content) {
        saveText.savePlace(latitude, longitude, function(res) {
            saveText.saveText("", userId, latitude, longitude,
                function(res) {
                    _idPost = res[0].id_post;
                    saveImage();
                });
        });
    } else {
        _result.send("");
    }
}


var handleRequest = function(req, res) {
    _request = req;
    _result = res;
    upload(req, res, function(err) {});
};

exports.handleRequest = handleRequest;
