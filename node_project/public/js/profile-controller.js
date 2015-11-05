$(document).ready(function() {
	upload_photo();
});

function upload_photo(){
	$('#footer-options-photo-upload').live('change', function()			{
		$("#footer-options-photo-upload-loading").css("display","block");

		$("#footer-options-photo-upload-form").ajaxForm({
			success:function(data, textStatus, jqXHR){
				$("#footer-options-photo-upload-loading").css("display","none");
				if (data != ""){
					alert(data);
				}else{
					refresh_page_post();
				}
			}
		}).submit();

	});
}

function show_hide_text_container(){
	show_hide_container('#text-upload-backgroud');
}

function show_hide_challenge_container(){
	show_hide_container('#challenge-view-backgroud');
}


function upload_text(){
	var text = $('#text-upload-content').val();
	if (text == "" || text == null){
		alert("Escribe algo");
	}else{
		if (filter_bad_words(text)){
			alert("No puedes poner malas palabras D:");
		}else{
			$.ajax({
				type: "POST",
				url: "log/logUploadText.php?post_text="+text,
				success: function(data){
					// BUG $('#container-items').html(data);
					show_hide_text_container();
					refresh_page_post();
				}
			});
		}
	}
}

function filter_bad_words(content){
	var bad_words = ["idiota","tonto", "tonta", "pinche", "pendejo", "chinga", "cabron", "puto", "puta"];
	for (var i = 0; i < bad_words.length; i++){
		if (content.indexOf(bad_words[i]) != -1){
			return true;
		}
	}
	return false;
}





function show_hide_map_container(){
	show_hide_container('#map-view-backgroud');
}

function show_hide_container(name){
	if ($(name).css("display") == "none"){
		$(name).fadeIn();
	}else{
		$(name).fadeOut();
	}
}




var last_post_id = 0;
function refresh_page_post(){
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/content",//?last_post_id="+last_post_id,
		//data: { last_post_id: last_post_id },
		success: function(data){
			if (data != "" && data != null){
				data = set_challange(data);
				$('#container-items').prepend(data);
			}

		}
	});
	//refresh_smilies_post();
}

function set_challange(data){
	if (data.indexOf("start_challenges_|") != -1) data = 	search_challenges(data,true);
	while (data.indexOf("start_challenges_|") != -1) data = search_challenges(data,false);
	return data;
}

function search_challenges(data, set_html){
	var pos_start_challenge = data.indexOf("start_challenges_|");
	var pos_end_challenge = data.indexOf("end_challenges_|");
	if ( pos_start_challenge != -1 && pos_end_challenge != -1){
		var challenge_img = data.substring(pos_start_challenge+18, pos_end_challenge);
		data = data.replace("start_challenges_|"+challenge_img+"end_challenges_|","");
		if (set_html){
			$('#challenge-view-container').html(
				challenge_img +
				"<input type=\"button\" class=\"general-button-negative\" value=\"Cerrar\" onclick=\"show_hide_challenge_container()\" />"
			);
			if ($("#challenge-view-backgroud").css("display") == "none")
				$("#challenge-view-backgroud").fadeIn();
		}
	}
	return data;
}






function refresh_smilies_post(){
	$.ajax({
		type: "POST",
		url: "log/logRefreshSmilies.php",
		success: function(data){
			$('#container-aux').prepend(data);
		}
	});
}

function set_smilie_post(id_post,val){
	$("#item-smilie-number-"+id_post).html(val);
}
function add_smilie_post(id_post){
	if ($("#item-smilie-container-"+id_post).prop('title') != "active"){
		$("#item-smilie-container-"+id_post).css("background","rgba(255,160,35,0.5)");
		$("#item-smilie-container-"+id_post).prop("title","active");
		set_smilie_post(id_post,parseInt($("#item-smilie-number-"+id_post).html())+1);
		$.ajax({
			type: "POST",
			url: "log/logAddSmilie.php?post_id="+id_post,
		});
	}
}
