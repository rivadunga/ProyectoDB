var sqlAdm = require("./../sql/SqlAdm.js")

var handleRequest = function (req, res)
{
    console.log(req.body.content);
    res.send("yolo");
};

exports.handleRequest = handleRequest;
