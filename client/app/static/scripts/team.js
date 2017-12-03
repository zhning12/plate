$(document).ready(function () {
	console.log(1);
	$(".team").addClass("active");
	$.ajax({
		type: "get",
		url: globalurl + "getUser" + fail,
		dataType: 'json',
		success: function (data) {
			if (data['status'] == 1) {
				console.log(data);
				var teamName = data['data']['teamName'];
				$("#teamName").append(teamName);
				}
			else {
				alert('error!');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
	$.ajax({
		type: "get",
		url: globalurl+'getMember',
		dataType: 'json',
		success: function (data) {
			if (data['status'] == 1) {
				for (var i = 0; i < data['data'].length; i++) {
					console.log(data);
					var object = data['data'][i];
					var list_new =
					'<div class="member">'+
						'<img class="avator" src="'+object['head']+'" alt="user avator">'+
						'<div class="member_info">'+
							'<div class="member_name">'+
								object['username']+
							'</div>'+
							'<div class="member_email">'+
								object['email']+
							'</div>'+
						'</div>'+
					'</div>';
					$(".member-list").append(list_new);
				}
			}
			else {
				alert('error!');
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
});