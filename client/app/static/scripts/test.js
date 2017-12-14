$(document).ready(function () {
	display();
	//$("#test").html($.cookie("testName"));
	//alert($.cookie("username"));
	$('.modal').modal();
	$("#signUp").click( function(){
		jsonData = {
			username : "挂呢品尼高",
			email : "exampl@qq.com",
			password: "123456",
			avatar : "sdfsfsfasfds",
			team : "abc"
		}
		$.ajax({
			type: "post",
			url: "/session/signUp",
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
	});

	$("#signIn").click( function(){
		jsonData = {
			email : "exampl@qq.com",
			password: "123456"
		}
		$.ajax({
			type: "post",
			url: "/session/signIn",
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
	});

	$("#signOut").click( function(){
		$.ajax({
			type: "get",
			url: "/session/signOut",
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

	$("#getUser").click( function(){
		$.ajax({
			type: "get",
			url: "/session/getUser",
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

	$("#withCookie").click( function(){
		$.ajax({
			type: "get",
			url: "http://localhost:7000/getTeamTask",
			xhrFields: {withCredentials: true},
			crossDomain: true,
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
});