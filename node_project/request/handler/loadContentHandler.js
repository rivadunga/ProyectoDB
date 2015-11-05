var sqlAdm = require("./../../sql/SqlAdm.js")



function getHtmlContent(r) {
    var res = "<div class=\"item-container\">";
    if (r.id_tip == 1)
        res += "<div class = \"item-text\">" + r.des_mcont  + "</div>";
	else
    	res += "<img class =\"item-img\" src=\"img-upload/" + r.des_mcont  + "\" />";

    res += "<div class=\"item-footer\"><hr><div class=\"item-smilie-container\" id=\"item-smilie-container-"+r.id_mcont+"\" onclick=\"add_smilie_post("+r.id_mcont+")\"><img src=\"img/img-smilies.png\" /></div><label class=\"item-smilie-user\">de: "+"Erick"+"</label><label class=\"item-smilie-number\" id=\"item-smilie-number-"+r.id_mcont+"\">"+r.smil_mcont+"</label></div></div>";
    return res;
}


var handleRequest = function(req, res, next) {
    var onFinish = function(query) {
        var result = "";
        for (var i = 0; i < query.length; i++) {
            result += getHtmlContent(query[i]);
        }
        res.send(result);
    }
    sqlAdm.getQuery("SELECT A.id_mcont,A.smil_mcont,A.des_mcont,A.id_tip,A.id_muser,(SELECT B.nam_muser limit 1) FROM mcontent A, muser B where A.id_muser = B.id_muser ORDER BY A.id_mcont DESC", onFinish);
};

exports.handleRequest = handleRequest;
