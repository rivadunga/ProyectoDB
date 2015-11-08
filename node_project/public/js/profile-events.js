
function show_hide_text_container()
{
    show_hide_container('#text-upload-backgroud');
}

function show_hide_map_container()
{
    show_hide_container('#map-view-backgroud');
}

function show_hide_container(name)
{
    if ($(name).css("display") == "none")
    {
        $(name).fadeIn();
    }
    else
    {
        $(name).fadeOut();
    }
}
