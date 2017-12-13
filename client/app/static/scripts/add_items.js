$(document).ready(function () {
	var count = 0;
	var ajax_num = 1;
	var objects = [];
	$(".task").addClass("active");
	$.ajax({
		type: "get",
		url: globalurl + "getMember/" + $.cookie("teamId") + fail,
		xhrFields: { withCredentials: true },
		crossDomain: true,
		dataType: 'json',
		async: false,
		success: function (data) {
			if (data['status'] == 1) {
				for (var i = 0; i < data['data'].length; i++) {
					var object = data['data'][i];
					checkbox_id = "checkbox-" + object['id'];
					object['checkbox_id'] = checkbox_id;
					objects[i] = object;
				}
			}
			else {
				alert('error!');
			}
			display(++count, ajax_num);
		},
		error: ajaxError
	});
	var card_new = new Vue({
		el: '#member_list',
		data: {
			members: objects
		},
		delimiters: ['${', '}']
	});

	$('#create_btn').click(function () {

		var name = $("#task_name").val();
		var description = $("#task_description").val();
		var added_url = $("#added_url").val();
		//var deadline = $("#deadline").val();
		var members = [];
		console.log('520');
		for (var object of objects) {
			if ($(`#${object.checkbox_id}`).prop("checked")) {
				members.push(object['id']);
			}
		}
		var jsonData = {
			"name": name,
			"description": description,
			"added_url": added_url,
			"deadline": "2017-11-12",
			"members": members
		}
		console.log(jsonData);
		$.ajax({
			type: "post",
			url: globalurl + "addTask" + fail,
			xhrFields: { withCredentials: true },
			crossDomain: true,
			dataType: 'json',
			success: function (data) {
				if (data['status'] == 1) {
					window.location.href = '/task';
				}
				else {
					alert('error!');
				}
			},
			error: ajaxError
		});
	});

});
//全选和全不选（第一个参数为复选框名称，第二个参数为是全选还是全不选）  
function allCheck() {
	$('.mdl-checkbox').toggleClass('is-checked');
}
function cancel() {
	window.location.href = '/task';
}

