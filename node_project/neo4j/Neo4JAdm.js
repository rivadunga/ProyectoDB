var neo4j = require('neo4j');

var getQuery = function(queryT, onFinish) {

    //var db = new neo4j.GraphDatabase('http://myspot:btWp9Ewb6EbwWMrPqczW@myspot.sb02.stations.graphenedb.com:24789/db/data/');
    var db = new neo4j.GraphDatabase('http://neo4j:12345@localhost:7474');
    db.cypher({
        query: queryT
    }, function (err, result) {
        if (err) console.log(err);
        onFinish(result);
    });
}

exports.getQuery = getQuery;
