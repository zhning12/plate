$(document).ready(function () {
	var count = 0;
	var ajax_num = 1;
	var task = [];
	$(".task").addClass("active");
	var url_id=getQueryVariable();
	console.log(url_id);
	$.ajax({
		type: "get",
		url: globalurl + "getTask/"+url_id + fail,
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
			display(++count,ajax_num);
		},
		error: ajaxError
	});
	var task_name = new Vue({
		el: '#task_name',
		data: {
			task: "task"
		},
		delimiters: ['${', '}']
	});
	
});

function getQueryVariable()
{
       var query = window.location['pathname'];
	   var vars = query.split("/");
	   
       return vars.pop();
}