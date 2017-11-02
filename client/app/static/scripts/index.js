$(document).ready(function () {
	console.log(12);
	jsonData = {
		name : "guanpeng"
	}
	$.ajax({
		type: "post",
		url: "http://127.0.0.1:7000/user",
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

	$.ajax({
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
	});
});