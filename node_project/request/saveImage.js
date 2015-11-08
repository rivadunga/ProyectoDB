var sqlAdm = require("./../sql/SqlAdm.js");
var multer = require('multer');
var upload = multer(
{
    dest: 'public/user-content/',
    rename: function (fieldname, filename)
    {
        return filename + Date.now();
    },
    onFileUploadStart: function (file)
    {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file)
    {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
});


var handleRequest = function (req, res)
{
    upload(req, res, function (err)
    {
        if (err)
        {
            console.log(err);
        }
        console.log("UPLOAD");
    });
    res.send("YOLO");
};

exports.handleRequest = handleRequest;
