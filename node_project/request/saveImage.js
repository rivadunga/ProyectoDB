var multer = require('multer');
var sanitizer = require('sanitizer');

var sqlAdm = require("./../sql/SqlAdm.js");
var saveText = require('./saveText');

var _request;
var _result;

var _fileName;
var _encode;


var saveImage = function() {

    var query1 =
        "INSERT INTO File(name, format, url) VALUES (" +
        "   '#1','#2','/user-content/#3')";

    query1 = query1.replace("#1", _fileName);
    query1 = query1.replace("#2", _encode);
    query1 = query1.replace("#3", _fileName);

    var query2 = "INSERT INTO PostFile(id_post, id_file) VALUES(" +
        "(SELECT MAX(id_post) FROM Post)," +
        "(SELECT id_file FROM File WHERE name = '#1'))";

    query2 = query2.replace("#1", _fileName);

    sqlAdm.getQuery(query1, function(res) {});
    sqlAdm.getQuery(query2, onSaveImage);
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
    var content = sanitizer.sanitize(_request.body.content);

    saveText.savePlace(latitude, longitude, function(res) {
        saveText.saveText("", userId, latitude, longitude,
            function(res) {
                saveImage();
            });
    });
}


var handleRequest = function(req, res) {
    _request = req;
    _result = res;
    upload(req, res, function(err) {});
};

exports.handleRequest = handleRequest;
