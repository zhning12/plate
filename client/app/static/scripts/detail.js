$(document).ready(function () {
	var count = 0;
	var ajax_num = 1;
	var task = [];
	$(".task").addClass("active");
	var task_id=getQueryVariable();
	console.log(task_id);
	$.ajax({
		type: "get",
		url: globalurl + "getTask/"+task_id + fail,
		xhrFields: {withCredentials: true},
		crossDomain: true,
		dataType: 'json',
		async: false,
		success: function (data) {
			if (data['status'] == 1) {
				data=data['data'];
				console.log(data);
				$("#task_name").append(data['name']);
				if(data['finished']==0){
					$('#task_title').prop('checked',false);
				}
				else{
					$('#task_title').prop('checked',true);
				}
				
				if(data['description']){
					$("#detail_info").append(data['description']);
				}
                else{
					$('.task_detail').addClass('none');
				}
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
	
	$('#task_title').change(function(){
		var finished=$('#task_title').prop('checked');
		finished=finished?'1':'0';
		console.log(finished);
		var jsonData = {
            "taskId": task_id,
            "finished": finished
        };
        console.log(jsonData);
        $.ajax({
            type: "post",
			url: globalurl + "updateState",
			xhrFields: {withCredentials: true},
			crossDomain: true,
            dataType: 'json',
            data: jsonData,
            success:function(data){
				if(data['status']==1){
					console.log('success');
				}
				else{
					console.log('failed');
				}
			},
            error: ajaxError
        });
		
	});
});

function getQueryVariable()
{
       var query = window.location['pathname'];
	   var vars = query.split("/");
       return vars.pop();
}