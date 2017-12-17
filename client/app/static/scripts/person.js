$(document).ready(function () {
	var count = 0;
	var ajax_num = 2;
	$(".person").addClass("active");

	var username = $.cookie("username");
	$("#user_name").append(username);
	var email=$.cookie("email");
	$("#e-mail").append(email);
	var avatar=localStorage.getItem("avatar");
	$("#avatar").attr("src",avatar);

	$("input").change(function(){
		console.log(1);
	});
	var tab1_add = new Vue({
		el: '#tab1',
		data: {
			tasks: []
		},
		created:function(){
			$.ajax({
				type: "get",
				url: globalurl + "getSendTask/" + $.cookie("username") +"/" + $.cookie("teamId")+ fail,
				xhrFields: {withCredentials: true},
				crossDomain: true,
				dataType: 'json',
				success: function (data) {
					if (data['status'] == 1) {
						console.log(data);
						for(var i=0;i<data['data'].length;i++){
							object = data['data'][i];
							checkbox= "checkbox_s"+object['id'];
							object['checkbox_id']=checkbox;
							Vue.set(tab1_add.tasks, i, object);
        					tab1_add.tasks.splice(i, 1, object);
						}
					}
					else {
						Materialize.toast('读取任务失败', 4000);
					}
					display(++count,ajax_num);
				},
				error: ajaxError
			});
		},
		methods: {
			convert: function (task) {
				task.finished = task.finished == 1?0:1;
				updateState(task);
				for(var index in tab2_add.tasks_2){
					var item = tab2_add.tasks_2[index];
					if(item.id == task.id){
						item.finished = task.finished;
						break;
					}
				}
			}
		},
		delimiters: ['${', '}']
	});
	var tab2_add = new Vue({
		el: '#tab2',
		data: {
			tasks_2: []
		},
		created:function(){
			$.ajax({
				type: "get",
				url: globalurl + "getReceiveTask/" + $.cookie("username") +"/" + $.cookie("teamId") + fail,
				xhrFields: {withCredentials: true},
				crossDomain: true,
				dataType: 'json',
				success: function (data) {
					if (data['status'] == 1) {
						console.log(data);
						for(var i=0;i<data['data'].length;i++){
							object = data['data'][i];
							checkbox= "checkbox_r"+object['id'];
							object['checkbox_id']=checkbox;
							Vue.set(tab2_add.tasks_2, i, object);
        					tab2_add.tasks_2.splice(i, 1, object);
						}

					}
					else {
						Materialize.toast('读取任务失败', 4000);
					}
					display(++count,ajax_num);
				},
				error: ajaxError
			});
		},
		methods: {
			convert: function (task) {
				task.finished = task.finished == 1?0:1;
				updateState(task);
				for(var index in tab1_add.tasks){
					var item = tab1_add.tasks[index];
					if(item.id == task.id){
						item.finished = task.finished;
						break;
					}
				}
			}
		},
		delimiters: ['${', '}']
	});

	function updateState(task){
		var jsonData = {
			"taskId": task.id,
			"finished": task.finished
		};
		$.ajax({
			type: "post",
			url: globalurl + "updateState",
			xhrFields: { withCredentials: true },
			crossDomain: true,
			data: jsonData,
			dataType: 'json',
			success: function (data) {
				if (data['status'] == 1) {
					Materialize.toast('修改任务状态成功', 4000);
				}
				else {
					Materialize.toast('修改任务状态失败', 4000);
				}
			},
			error: ajaxError
		});
	}
});