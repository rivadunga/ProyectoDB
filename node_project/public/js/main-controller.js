function load_page(page_name){
	$('#container-main').css("display", "none");
	$.ajax({   
		type: "POST",
		url: "web-content/"+page_name,
		success: function(data){       
			$('#container-main').html(data);
			$('#container-main').fadeIn();
		}
	});
}

function redirect_profile(user_id_var){
	 window.location="log/logRegister.php?" +
		"user_id="+user_id_var+"&" +
		"color_pref="+answers[1]+"&" +
		"sex_pref="+answers[2];
}


var user_name = "desconocido";
var answers = new Array();
answers[1] = 1;
answers[2] = 1;

function set_user(value){
	user_name = value;
}

function set_answer(id_answer,value){
	answers[id_answer] = value;
}

function save_all_content(){
	var user_id_var = user_name+"_|"+Math.floor((Math.random()*10000)+1); 
	redirect_profile(user_id_var);
}