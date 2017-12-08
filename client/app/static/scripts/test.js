$(document).ready(function () {
	// console.log(12);
	// jsonData = {
	// 	email : "example@qq.com",
	// 	password: "123456"
	// }
	// $.ajax({
	// 	type: "post",
	// 	url: globalurl+"signIn"+fail,
	// 	dataType: 'json',
	// 	data: jsonData,
	// 	success: function (data) {
	// 		console.log(data);
	// 	},
	// 	error: function (jqXHR, textStatus, errorThrown) {
	// 		console.log(jqXHR);
	// 		console.log(textStatus);
	// 		console.log(errorThrown);
    //     }
	// });

	// $("#abc").click( function(){
	// 	jsonData = {
	// 		email : "example@qq.com",
	// 		password: "123456"
	// 	}
	// 	$.ajax({
	// 		type: "post",
	// 		url: "http://result.eolinker.com/n7d6z5u6691b12046479482492142f3acfa7b501e22b581?uri=http://127.0.0.1:7000/signIn&resultType=failure",
	// 		dataType: 'json',
	// 		data: jsonData,
	// 		success: function (data) {
	// 			console.log(data);
	// 		},
	// 		error: function (jqXHR, textStatus, errorThrown) {
	// 			console.log(jqXHR);
	// 			console.log(textStatus);
	// 			console.log(errorThrown);
	// 		}
	// 	});
	// })
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
});