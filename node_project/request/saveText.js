var sqlAdm = require("./../sql/SqlAdm.js")

var handleRequest = function (req, res)
{
    console.log(req.content);
    res.send("yolo");
};

exports.handleRequest = handleRequest;
