$(document).ready(function () {
    console.log(1);
	$("#signUp").click( function(){
        var name=$("#name").val();
        var email=$("#email").val();
        var password=$("#password").val();
		jsonData = {
            "name": name,
			"email" : email,
            "password": password
        }
        console.log(jsonData["name"] );
        console.log(jsonData["email"]);
        console.log(jsonData["password"]);

        $.ajax({
			type: "post",
			url: "http://result.eolinker.com/n7d6z5u6691b12046479482492142f3acfa7b501e22b581?uri=http://127.0.0.1:7000/signIn",
			dataType: 'json',
			data: jsonData,
			success: function (data) {
                console.log(data);
                if(data["state"]==1){                               window.location.href='/task';
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