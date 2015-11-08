$(document).ready(function ()
{
    upload_photo();
});

function upload_photo()
{
    $('#footer-options-photo-upload').live('change', function ()
    {
        $("#footer-options-photo-upload-loading").css("display",
            "block");

        $("#footer-options-photo-upload-form").ajaxForm(
        {
            success: function (data, textStatus, jqXHR)
            {
                $("#footer-options-photo-upload-loading").css(
                    "display", "none");
                if (data != "")
                {
                    alert(data);
                }
                else
                {
                    refresh_page_post();
                }
            }
        }).submit();

    });
}


function upload_text()
{
    var text = $('#text-upload-content').val();
    if (text)
        send_text(text);
}

function send_text(content)
{
    $.ajax(
    {
        type: "POST",
        url: "/saveText",
        data:
        {
            content: content
        },
        success: function (data)
        {
            show_hide_text_container();
            refresh_page_post();
        }
    });

}


var last_post_id = 0;

function refresh_page_post()
{
    $.ajax(
    {
        type: "POST",
        url: "/getPosts",
        success: function (data)
        {
            if (data != "" && data != null)
            {
                $('#container-items').prepend(data);
            }
        }
    });
    //refresh_smilies_post();
}

function set_smilie_post(id_post, val)
{
    $("#item-smilie-number-" + id_post).html(val);
}

function add_smilie_post(id_post)
{
    if ($("#item-smilie-container-" + id_post).prop('title') != "active")
    {
        $("#item-smilie-container-" + id_post).css("background",
            "rgba(255,160,35,0.5)");
        $("#item-smilie-container-" + id_post).prop("title", "active");
        set_smilie_post(id_post, parseInt($("#item-smilie-number-" + id_post).html()) +
            1);
        $.ajax(
        {
            type: "POST",
            url: "log/logAddSmilie.php?post_id=" + id_post,
        });
    }
}
