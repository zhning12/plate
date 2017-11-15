$(document).ready(function () {
	console.log(12);
	jsonData = {
		email : "example@qq.com",
		password: "123456"
	}
	$.ajax({
		type: "post",
		url: "http://result.eolinker.com/n7d6z5u6691b12046479482492142f3acfa7b501e22b581?uri=http://127.0.0.1:7000/signIn&resultType=failure",
		dataType: 'json',
		data: jsonData,
		success: function (data) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
        }
	});

	$("#abc").click( function(){
		jsonData2 = {
			email : "example@qq.com",
			password: "123456"
		}
		$.ajax({
			type: "post",
			url: "http://127.0.0.1:7000/signIn",
			dataType: 'json',
			data: jsonData2,
			success: function (data) {
				console.log(data);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	})
	/*$.ajax({
		type: "get",
		url: "http://127.0.0.1:7000/user",
		dataType: 'json',
		success: function (data) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
        }
	});*/
});