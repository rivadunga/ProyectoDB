function login()
{
    var user = $("#email").val();
    var pass = $("#password").val();

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
                    if (data == "LOGIN"){
                        window.location = "../";
                    }
                    else{
                        Materialize.toast("Usuario o contraseña incorrecta", 4000);
                    }

                }
            });
        });
    }else{
        Materialize.toast("No soporta localizacion", 4000);
    }

}
