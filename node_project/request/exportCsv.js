var fs = require('fs');
var path = require('path');

var _result;
var _request;
var _idUser;

var exportCsv = function()
{

}

var handleRequest = function(req, res) {
    _result = res;
    _request = req;

    var sess = _request.session;
    _idUser = sess.userId;
    exportCsv();
};


exports.handleRequest = handleRequest;
