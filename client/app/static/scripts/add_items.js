$(document).ready(function () {
	var count = 0;
	var ajax_num = 1;
	var objects = [];
	var added_url = '';
	$(".task").addClass("active");
	$("#all_choose").click(function(){
		for (var index in objects) {
			var node = $('#'+objects[index]['checkbox_id']);
			node.prop("checked",true);
		}
	});
	$("#all_cancel").click(function(){
		for (var index in objects) {
			var node = $('#'+objects[index]['checkbox_id']);
			node.prop("checked",false);
		}
	});
	$("#added_url").change(function(){
		$.ajax({
			url: '/upload',
			type: 'POST',
			cache: false,
			data: new FormData($('#uploadForm')[0]),
			processData: false,
			contentType: false,
			success: function (data) {
				console.log(data);
				added_url = data;
				$('.thumbnails').empty();
				var urls = added_url.split(',');
				for(var index in urls){
					var ele = '<img class="materialboxed" data-caption="" src="/upload/'+urls[index]+'"></div>';
					$('.thumbnails').append(ele);
				}
				$('.materialboxed').materialbox();
			},
			error: ajaxError
		});
	});
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15, // Creates a dropdown of 15 years to control year,
		today: 'Today',
		clear: 'Clear',
		close: 'Ok',
		closeOnSelect: false // Close upon selecting a date,
	});
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
		if($("#task_name").val() == '' || $("#deadline").val() == ''){
			Materialize.toast('请将任务信息填写完全', 4000);
		}
		else{
			var members = [];
			for (var index in objects) {
				if ($('#'+objects[index]['checkbox_id']).prop('checked')) {
					members.push(objects[index]['username']);
				}
			}
			if(members.length == 0){
				Materialize.toast('请选择负责成员', 4000);
			}
			else{
				var jsonData = {
					"teamId": $.cookie("teamId"),
					"username": $.cookie("username"),
					"name": $("#task_name").val(),
					"description": $("#task_description").val(),
					"addedUrl": added_url,
					"deadline": new Date($("#deadline").val()).Format("yyyy-MM-dd"),
					"members": members.join(",")
				}
				console.log(jsonData);
				$.ajax({
					type: "post",
					url: globalurl + "addTask" + fail,
					xhrFields: { withCredentials: true },
					crossDomain: true,
					data: jsonData,
					dataType: 'json',
					success: function (data) {
						if (data['status'] == 1) {
							Materialize.toast('添加任务成功', 4000);
							window.location.href = '/task';
						}
						else {
							Materialize.toast('添加任务失败', 4000);
						}
					},
					error: ajaxError
				});
			}
		}
	});

});
//全选和全不选（第一个参数为复选框名称，第二个参数为是全选还是全不选）  
function cancel() {
	window.location.href = '/task';
}

