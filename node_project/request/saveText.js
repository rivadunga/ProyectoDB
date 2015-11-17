var sqlAdm = require("./../sql/SqlAdm.js");
var sanitizer = require('sanitizer');

var _result;
var _request;


var savePlace = function(latitude, longitude, onFinish) {

    var query =
        " INSERT into Place (name, latitude, longitude, radio) " +
        "   SELECT  CONCAT('place',ROUND(100.0 + 400.0 * RAND())), " +
        "   #1,#2,50 " +
        "      FROM place P " +
        "   WHERE " +
        "      (SELECT COUNT(P_in.id_place) FROM Place P_in " +
        " 	         WHERE SQRT(POW(P_in.latitude  - #3,2) + " +
        "                       POW(P_IN.longitude - #4,2)) " +
        "                   < P_in.radio * 0.00001 ) = 0 " +
        "  LIMIT 1";

    query = query.replace("#1", latitude);
    query = query.replace("#2", longitude);
    query = query.replace("#3", latitude);
    query = query.replace("#4", longitude);
    sqlAdm.getQuery(query, onFinish);
}


var saveText = function(content, userId, latitude, longitude, onFinish) {
    var query =
        "INSERT INTO POST (date, content, id_user, id_place) VALUES (" +
        "   NOW(), '#1', #2 ," +
        "   (SELECT id_place FROM Place " +
        "       WHERE SQRT(POW(latitude - #3,2) + POW(longitude - #4,2)) " +
        "               < radio * 0.00001 LIMIT 1))";

    query = query.replace("#1", content);
    query = query.replace("#2", userId);
    query = query.replace("#3", latitude);
    query = query.replace("#4", longitude);

    sqlAdm.getQuery(query, onFinish);
}

var onSaveText = function(res) {
    _result.send("SAVED");
}

var handleRequest = function(req, res) {
    sess = req.session;
    _request = req;
    _result = res;
    var latitude = sess.userLatitude;
    var longitude = sess.userLongitude;
    var userId = sess.userId;
    var content = sanitizer.sanitize(req.body.content);

    if (latitude && longitude && userId && content) {
        savePlace(latitude, longitude, function(res) {
            saveText(content, userId, latitude, longitude,
                onSaveText);
        });
    } else {
        res.send("");
    }

};

exports.savePlace = savePlace;
exports.saveText = saveText;
exports.handleRequest = handleRequest;
