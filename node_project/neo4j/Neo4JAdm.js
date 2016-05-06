var neo4j = require('neo4j');

var getQuery = function(queryT, onFinish) {

    var db = new neo4j.GraphDatabase('http://myspot:btWp9Ewb6EbwWMrPqczW@myspot.sb02.stations.graphenedb.com:24789/db/data/');

    db.cypher({
        query: queryT
    }, function (err, result) {
        onFinish(result);
    });
}

exports.getQuery = getQuery;
