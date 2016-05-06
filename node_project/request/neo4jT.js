var neo4j = require("./../neo4j/Neo4JAdm.js")

var _result;
var _request;

var _user;
var _pass;

var login = function() {
    var query = 'MATCH (u:User) WITH COUNT(u.id_user) as _exists,u WHERE u.id_user = "Mike" RETURN _exists';
    neo4j.getQuery(query,
        function (result) {
            _result.render('neo4j',{
                res: result
            });
    });
}

var handleRequest = function(req, res) {
    _result = res;
    _request = req;
    login();
};

exports.handleRequest = handleRequest;
