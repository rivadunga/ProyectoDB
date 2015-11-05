var contentHandler = require("./handler/loadContentHandler.js");

var handleContentRequest = function(req, res, next) {
    contentHandler.handleRequest(req,res,next);
};

exports.handleContentRequest = handleContentRequest;
