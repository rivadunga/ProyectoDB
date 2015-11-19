var sqlAdm = require("./../sql/SqlAdm.js")

var _result;
var _request;


var getDashboard = function()
{
    var query = "SELECT *     FROM    (SELECT TLikesA._likes AS A1, TLikesA._content AS A2, TLikesA._name AS A3 FROM      (SELECT COUNT(L.id_like) AS _likes, P.content AS _content, U.name AS _name          FROM Post P              LEFT JOIN Likes L ON P.id_post = L.id_post              LEFT JOIN User U ON P.id_user = U.id_user          WHERE P.content <> ''          GROUP BY P.id_post 		 ORDER BY _likes DESC LIMIT 1) AS TLikesA) AS A,  		  (SELECT TLikesB._likes AS B1, TLikesB._content AS B2, TLikesB._name AS B3 FROM      (SELECT COUNT(L.id_like) AS _likes, F.name AS _content, U.name AS _name          FROM Post P              LEFT JOIN Likes L ON P.id_post = L.id_post              LEFT JOIN User U ON P.id_user = U.id_user       		LEFT JOIN PostFile PF ON PF.id_post = P.id_post       		LEFT JOIN File F ON PF.id_file = F.id_file          WHERE P.content = ''          GROUP BY P.id_post 		 ORDER BY _likes DESC LIMIT 1) AS TLikesB) AS B,  		  (SELECT TLikesC._likes AS C1, TLikesC._name AS C2	FROM  	(SELECT COUNT(L.id_like) AS _likes, U.name AS _name          FROM User U   			LEFT JOIN Post P ON P.id_user = U.id_user              LEFT JOIN Likes L ON P.id_post = L.id_post          GROUP BY U.id_user 		 ORDER BY _likes DESC LIMIT 1) AS TLikesC) AS C,    (SELECT TLikesD._followers AS D1, TLikesD._name AS D2	FROM		  	(SELECT COUNT(Fr.id_user_b) AS _followers, U.name AS _name          FROM User U   			LEFT JOIN Friends Fr ON U.id_user = Fr.id_user_a          GROUP BY U.id_user 		 ORDER BY _followers DESC LIMIT 1) AS TLikesD) AS D  		  		  ";
    sqlAdm.getQuery(query,loadDashboard);
}

var loadDashboard = function(res)
{
    if (res){
    _result.render('dashboard', {
        res: res
    });
}else{
    _result.send("");
}

}


var handleRequest = function(req, res) {
    _request = req;
    _result = res;
    getDashboard();
};


exports.handleRequest = handleRequest;
