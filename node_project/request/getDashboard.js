var sqlAdm = require("./../sql/SqlAdm.js")

var _result;
var _request;



var handleRequest = function(req, res) {
    _request = req;
    _result = res;
    _result.render('dashboard');
};


exports.handleRequest = handleRequest;
