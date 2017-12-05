$(document).ready(function () {
	var objects = [];
	$(".task").addClass("active");
	$.ajax({
		type: "get",
		url: globalurl + "getMember" + fail,
		dataType: 'json',
		async: false,
		success: function (data) {
			if (data['status'] == 1) {
				for (var i = 0; i < data['data'].length; i++) {
                    var object = data['data'][i];
                    checkbox = "checkbox-"+object['id'];
					object['checkbox_id']= checkbox;
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
		el: '#member_list',
		data: {
				members: objects
		},
		delimiters:['${','}']
	});
});