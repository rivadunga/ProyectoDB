function login()
{
    var user = $("#user").val();
    var pass = $("#pass").val();

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function (position)
        {
            $.ajax(
            {
                type: "POST",
                url: "/login",
                data:
                {
                    user: user,
                    pass: pass,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                success: function (data)
                {
                    if (data == "LOGIN")
                        window.location = "../";
                    if (data == "LOCK")
                        alert(
                            "Usuario o contraseña incorrecta"
                        );

                }
            });
        });
    }

}
