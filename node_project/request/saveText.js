var neo4j = require("./../neo4j/Neo4JAdm.js");
var sanitizer = require('sanitizer');


var _result;
var _request;

var getPlaceId = function(latitude, longitude, onFinish) {

    var query =
        "MATCH (p:Place) " +
        "WHERE sqrt((abs(p.latitude-#1))^2 + (abs(p.longitude-#2))^2) < p.radio * .00001 " +
        "RETURN p.id_place";

    query = query.replace("#1", latitude);
    query = query.replace("#2", longitude);

    neo4j.getQuery(query, onFinish);
}

var savePlace = function(latitude, longitude, onFinish) {

    getPlaceId(latitude, longitude,
        function(res) {
            if (!res[0]) {
                var query =
                    "MATCH (p:Place) " +
                    "WITH CASE WHEN COUNT(p.id_place) = 0 THEN 1 ELSE MAX(p.id_place) + 1 END AS id_place " +
                    "CREATE (p:Place { id_place: id_place, name : '#1', latitude : #2, longitude : #3, radio : 50})";

                query = query.replace("#1", "place");
                query = query.replace("#2", latitude);
                query = query.replace("#3", longitude);

                neo4j.getQuery(query, onFinish);
            } else {
                onFinish(null);
            }
        }
    )
}


var saveText = function(content, userId, latitude, longitude, onFinish) {

    var query =
        "MATCH (p:Post) " +
        "WITH CASE WHEN COUNT(p.id_post) = 0 THEN 1 ELSE MAX(p.id_post) + 1 END AS id_post " +
        "CREATE (p:Post { id_post: id_post, date : timestamp(), content : '#1'}) " +
        "RETURN id_post";

    query = query.replace("#1", content);
    console.log(query);


    neo4j.getQuery(query, function(res) {

        var query2 =
            "MATCH (po:Post),(pl:Place),(u:User) " +
            "WHERE po.id_post = #1 AND  sqrt((abs(pl.latitude-#2))^2 + (abs(pl.longitude-#3))^2) < pl.radio * .00001 AND u.id_user = '#4' " +
            "CREATE UNIQUE (po)-[rpl:ESTA_EN]->(pl) " +
            "CREATE UNIQUE (po)-[ru:ES_DE]->(u) " +
            "RETURN po.id_post AS id_post";

        var idPost = res[0].id_post;

        query2 = query2.replace("#1", idPost);
        query2 = query2.replace("#2", latitude);
        query2 = query2.replace("#3", longitude);
        query2 = query2.replace("#4", userId);
        console.log(query2);

        neo4j.getQuery(query2, onFinish);
    });
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
