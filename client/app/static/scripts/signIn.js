$(document).ready(function () {
	console.log(1);
	$("#abc").click( function(){
		jsonData = {
			email : "example@qq.com",
			password: "123456"
		}
		$.ajax({
			type: "post",
			url: "http://127.0.0.1:7000/signIn",
			dataType: 'json',
			data: jsonData,
			success: function (data) {
				console.log(data);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
		});
	})

});