var sqlAdm = require("./../sql/SqlAdm.js")

var _result;
var _request;


var handleRequest = function(req, res) {
    _request = req;
    _result = res;
    var sess = _request.session;

    if (sess.userId && sess.userLatitude && sess.userLongitude) {
        res.render('map', {
            latitude: sess.userLatitude,
            longitude: sess.userLongitude
        });
    } else
        res.send("");

};


exports.handleRequest = handleRequest;
