$(document).ready(function () {
    console.log(1);
    $("#signUp").click(function () {
        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        jsonData = {
            "username": name,
            "email": email,
            "password": password
        }
        console.log(jsonData["name"]);
        console.log(jsonData["email"]);
        console.log(jsonData["password"]);

        $.ajax({
            type: "post",
            url: globalurl + "signUp" + fail,
            dataType: 'json',
            data: jsonData,
            success: function (data) {
                console.log(data);
                if (data["status"] == 1) {
                    window.location.href = '/sign-in';
                }
                else{
                    if(data['message'] == 'username-existed-error'){

                    }
                    if(data['message'] == 'email-existed-error'){

                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    })

});