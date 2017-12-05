$(document).ready(function () {
	var objects = [];
	$(".task").addClass("active");
	$.ajax({
		type: "get",
		url: globalurl + "getTeamTask" + fail,
		dataType: 'json',
		async: false,
		success: function (data) {
			if (data['status'] == 1) {
				console.log(data);

				for (var i = 0; i < data['data'].length; i++) {
					var object = data['data'][i];
					var icon;
					icon = object.finished == 1 ? 'check_circle' : 'help_outline';
					object['icon'] = icon;
					objects[i] = object;
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
	var card_new = new Vue({
		el: '#card_list',
		data: {
			objects: objects
		},
        delimiters:['${', '}']  
	})

});