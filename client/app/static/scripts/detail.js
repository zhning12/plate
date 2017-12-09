$(document).ready(function () {
	var task = [];
	$(".task").addClass("active");
	$.ajax({
		type: "get",
		url: globalurl + "getTask/{taskId}" + fail,
		dataType: 'json',
		async: false,
		success: function (data) {
			if (data['status'] == 1) {
                $("#task_name").append(data['name']);
                $("#detail_info").append(data['']);
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
	var task_name = new Vue({
		el: '#task_name',
		data: {
			task: "task"
		},
		delimiters: ['${', '}']
	});
	
});

