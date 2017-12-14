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
            url: globalurl + "signUp",
            dataType: 'json',
            data: jsonData,
            success: ajaxSuccess,
            error: ajaxError
        });
    })
    function ajaxSuccess(data) {
        console.log(data);
        if (data["status"] == 1) {
            var head = ['id','username', 'email','avatar', 'teamId', 'created', 'updated','teamName'];
			for(item in head){
                $.cookie(head[item],data['data'][head[item]], { expires: 7 });
			}
            window.location.href = '/switch';
        }
        else {
            if (data['message'] == 'username-existed-error') {
                $('#name_message').text('用户名已存在').addClass('input_error');
            }
            if (data['message'] == 'email-existed-error') {
                $('#email_message').text('邮箱已存在').addClass('input_error');
            }
        }
    }
    var email_check=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    $('#email').bind('input propertychange', function () {
        if (!email_check.test($('#email').val())) {
            $('#email_message').html('邮箱名不符合标准，示例：1001@qq.com').addClass('input_error');
        }
        else{
            $('#email_message').html('邮箱名符合标准，示例：1001@qq.com').removeClass('input_error');
        }
    });
    $('#password').bind('input propertychange', function () {
        var pwd=$('#password').val();
        if (pwd.length>16||pwd.length<6) {
            $('#password_message').html('密码长度不符合标准，应在6-16位之间').addClass('input_error');
        }
        else{
            $('#password_message').html('密码长度符合标准').removeClass('input_error');
        }
    });
});