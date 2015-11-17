function like(idPost)
{
    $.ajax({
        type: "POST",
        url: "/like",
        data: {
            idPost: idPost,
        },
        success: function(data) {
            refreshInfo();
        }
    });
}

function follow(idUser)
{
    $.ajax({
        type: "POST",
        url: "/follow",
        data: {
            idUser: idUser
        },
        success: function(data) {
            refreshInfo();
        }
    });
}
