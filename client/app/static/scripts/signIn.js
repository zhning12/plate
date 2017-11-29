$(document).ready(function () {
	console.log(1);
	$("#abc").click( function(){
		jsonData = {
			email : "example@qq.com",
			password: "123456"
		}
		$.ajax({
			type: "post",
			url: globalurl+"signIn"+fail,
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