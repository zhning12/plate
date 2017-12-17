$(document).ready(function () {
	var count = 0;
	var ajax_num = 1;
	var task = [];
	$(".task").addClass("active");
	var task_id = getQueryVariable();
	console.log(task_id);
	var members = [];
	var task_detail = new Vue({
		el: '#contain',
		data: {
			members: []
		},
		created: function () {
			$.ajax({
				type: "get",
				url: globalurl + "getTask/" + task_id + fail,
				xhrFields: { withCredentials: true },
				crossDomain: true,
				dataType: 'json',
				success: function (data) {
					if (data['status'] == 1) {
						data = data['data'];
						console.log(data);
						//显示任务名字
						$("#task_name").append(data['name']);
						//根据任务是否完成给框框打勾
						var state = (data['finished'] == 0) ? false : true;
						$('#task_title').prop('checked', state);

						//是否有详情描述
						if (data['description']) {
							$("#detail_info").append(data['description']);
						}
						else {
							$('.task_detail').addClass('none');
						}
						//截止时间
						$('#deadline').append(data['deadline']);
						//获取成员信息
						task_detail.members = data['member'];
						console.log(task_detail.members);
						//图片
						if (data['addedUrl']=='') {

							$('.task_file').addClass('none');
						}
						else {
							var urls = data['addedUrl'];
							console.log(urls);
							for (var index in urls) {
								var ele = '<img class="materialboxed" data-caption="" src="/upload/' + urls[index] + '"></div>';
								$('.thumbnails').append(ele);
							}
							$('.materialboxed').materialbox();
						}

					}
					else {
						Materialize.toast('读取任务失败', 4000);
					}
					display(++count, ajax_num);
				},
				error: ajaxError
			});
		},

		delimiters: ['${', '}']
	});


	$('#task_title').change(function () {
		var finished = $('#task_title').prop('checked');
		finished = finished ? '1' : '0';
		var jsonData = {
			"taskId": task_id,
			"finished": finished
		};
		$.ajax({
			type: "post",
			url: globalurl + "updateState",
			xhrFields: { withCredentials: true },
			crossDomain: true,
			dataType: 'json',
			data: jsonData,
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

	});
});

function getQueryVariable() {
	var query = window.location['pathname'];
	var vars = query.split("/");
	return vars.pop();
}