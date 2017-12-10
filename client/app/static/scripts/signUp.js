$(document).ready(function () {
    $("#main").css('display', 'flex');
    $("#main").css('height', '100%');
    $("#progress").remove();
    $("#signUp").click(function () {
        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var avatar = textToImg(name, 100);
        var jsonData = {
            "username": name,
            "email": email,
            "password": password,
            "avatar": avatar
        };
        console.log(jsonData);
        $.ajax({
            type: "post",
            url: "/session/signUp",
            dataType: 'json',
            data: jsonData,
            success: ajaxSuccess,
            error: ajaxError
        });
    })
    function ajaxSuccess(data){
        console.log(data);
        if (data["status"] == 1) {
            window.location.href = '/sign-in';
        }
        else {
            if (data['message'] == 'username-existed-error') {

            }
            if (data['message'] == 'email-existed-error') {

            }
        }
    }
});