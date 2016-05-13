function signup()
{
    var user = $("#username").val();
    var email = $("#email").val();
    var pass = $("#password").val();

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function (position)
        {
            $.ajax(
            {
                type: "POST",
                url: "/signup",
                data:
                {
                    user: user,
                    email: email,
                    pass: pass,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                success: function (data)
                {
                    if (data == "LOGIN"){
                        window.location = "../";
                    }
                    if (data == "WRONG"){
                        Materialize.toast("Usuario o contraseña incorrectos.", 4000);
                    }
                    if (data == "INCOMPLETEFIELDS"){
                        Materialize.toast("Todos los campos son obligatorios.", 4000);
                    }
                    if (data == "ALREDYEXISTS"){
                        Materialize.toast("El usuario ya existe.", 4000);
                    }

                }
            });
        });
    }else{
        Materialize.toast("No soporta localizacion", 4000);
    }

}
