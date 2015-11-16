function like(idPost)
{
    $.ajax({
        type: "POST",
        url: "/like",
        data: {
            idPost: idPost,
            like: true
        },
        success: function(data) {
            alert(data);
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
            alert(data);
        }
    });
}
