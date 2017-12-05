$(document).ready(function () {
	console.log(1);
	$("#abc").click(function () {
		var email = $("#email").val();
		var password = $("#password").val();
		jsonData = {
			email: email,
			password: password
		}
		$.ajax({
			type: "post",
			url: globalurl + "signIn" + fail,
			dataType: 'json',
			data: jsonData,
			success: function (data) {
				console.log(data);
				if (data["status"] == 1) {
					window.location.href = '/task';
				}
				else {

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