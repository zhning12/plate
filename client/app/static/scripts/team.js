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
	objects = [];
	$.ajax({
		type: "get",
		url: globalurl + 'getMember',
		dataType: 'json',
		async: false,
		success: function (data) {
			if (data['status'] == 1) {
				objects = data['data'];
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
	var card_new = new Vue({
		el: '#member_list',
		data: {
			objects: objects
		},
		delimiters: ['${', '}']
	})
});