$(document).ready(function () {
	$("#main").css('display','flex');
	$("#main").css('height','100%');
	$("#progress").remove();
	$("#sign-in").click(function () {
		var email = $("#email").val();
		var password = $("#password").val();
		jsonData = {
			email: email,
			password: password
		}
		$.ajax({
			type: "post",
			url: globalurl + "signIn",
			dataType: 'json',
			data: jsonData,
			success: ajaxSuccess,
			error: ajaxError
		});
	})

	function ajaxSuccess(data){
		
        console.log(data);
		if (data["status"] == 1) {
			var head = ['id','username', 'email','avatar', 'teamId', 'created', 'updated','teamName'];
			for(item in head){
				$.cookie(head[item],data['data'][head[item]], { expires: 7 });
			}
			window.location.href = '/task';
		}
		else {
			var snackbarContainer = document.querySelector('#demo-toast-example');
			'use strict';
			var data = {message: '用户名或密码错误' };
			snackbarContainer.MaterialSnackbar.showSnackbar(data);  
		}
	}
	
});
