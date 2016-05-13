$(document).ready(function() {
    refreshContent();
      $('.modal-trigger').leanModal();
    setInterval(function() {
        refreshContent();
    }, 4000);
    uploadPhoto();
    $('#loading').fadeOut();
});

function uploadPhoto() {
    $('#loading').fadeIn();
    $('#IP_form').live('change', function() {
        $("#IP_form").ajaxForm({
            success: function(data, textStatus, jqXHR) {
                $('#loading').fadeOut();
            }
        }).submit();
    });
}


function uploadText() {
    var text = $('#TP_text').val();
    if (text) sendText(text);
}

function sendText(content) {
    $('#loading').fadeIn();
    $.ajax({
        type: "POST",
        url: "/saveText",
        data: {
            content: content
        },
        success: function(data) {
            $('#loading').fadeOut();
        }
    });
}




function uploadVideo() {
    var text = $('#TP_video').val();
    if (text){
        sendVideo(youtube_parser(text));
    }
}

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function sendVideo(content) {
    $('#loading').fadeIn();
    $.ajax({
        type: "POST",
        url: "/saveVideo",
        data: {
            content: content
        },
        success: function(data) {
            $('#loading').fadeOut();
        }
    });
}





function refreshContent() {

    var lastIndex = 0;
    if ($('.idPost:first').val())
        lastIndex = $('.idPost:first').val();

    $.ajax({
        type: "POST",
        url: "/getPosts",
        data: {
            lastIndex: lastIndex
        },
        success: function(data) {
            if (data != "" && data != null)
                $('#mainContainer').prepend(data);
        }
    });
}



function getFriends()
{
    $.ajax({
        type: "POST",
        url: "/getFriends",
        success: function(data) {
            $('#friendsContainer').html(data);
        }
    });
}

function getNotifications()
{
    $.ajax({
        type: "POST",
        url: "/getNotifications",
        success: function(data) {
            $('#notificationsContainer').html(data);
        }
    });
}


function getMap()
{
    $.ajax({
        type: "POST",
        url: "/getMap",
        success: function(data) {
            $('#mapContainer').html(data);
        }
    });
}


function refreshInfo() {

    $.ajax({
        type: "POST",
        url: "/getPostsInfo",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                $('#content' + data[i].id_post + " .like")
                    .html(data[i]._likes);
                $('#content' + data[i].id_post + " .follow")
                    .html(data[i]._iFollow > 0 ? "UNFOLLOW" : "FOLLOW");
            }
        }
    });
}
