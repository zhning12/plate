$(document).ready(function () {
	var count = 0;
	var ajax_num = 1;
	var newTeamId , newTeamName;
	Materialize.toast('请确定您的团队', 4000);
	$('.modal').modal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		inDuration: 300, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '4%', // Starting top style attribute
		endingTop: '10%', // Ending top style attribute
		ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
			if(trigger['context']['href']!=undefined){
				newTeamId = trigger['context']['children'][0]['id'];
				newTeamName = trigger['context']['children'][0]['innerText'];
			}
			else{
				newTeamId = trigger['context']['id'];
				newTeamName = trigger['context']['innerText'];
			}
		},
		complete: function () { } // Callback for Modal close
	});
	$(".more").addClass("active");
	$("#teamName_head").text("PLATE");
	$("#yes").click(function () {
		var jsonData = {
			"username": $.cookie("username"),
			"oldTeamId": $.cookie("teamId"),
			"newTeamId": newTeamId
		};
		$.ajax({
			type: "post",
			url: globalurl + "updateTeam",
			xhrFields: { withCredentials: true },
			crossDomain: true,
			data: jsonData,
			dataType: 'json',
			success: function (data) {
				if (data['status'] == 1) {
					$.cookie("teamId", newTeamId, { expires: 7 });
					$.cookie("teamName", newTeamName, { expires: 7 });
					$('#choose_modal').modal('close');
					Materialize.toast('修改团队成功', 4000);
				}
				else {
					$('#choose_modal').modal('close');
					Materialize.toast('修改团队失败', 4000);
				}
			},
			error: ajaxError
		});
	});
	$("#no").click(function () {
		$('#choose_modal').modal('close');
	});
	$("#cancel").click(function () {
		$('#modal1').modal('close');
	});
	$("#create").click(function () {
		var jsonData = {
			"username": $.cookie("username"),
			"name": $("#team_name").val()
		};
		$.ajax({
			type: "post",
			url: globalurl + "addTeam",
			xhrFields: { withCredentials: true },
			crossDomain: true,
			data: jsonData,
			dataType: 'json',
			success: function (data) {
				if (data['status'] == 1) {
					$.cookie("teamId", data['data']['teamId'], { expires: 7 });
					$.cookie("teamName", data['data']['teamName'], { expires: 7 });
					$('#modal1').modal('close');
					Materialize.toast('创建成功', 4000);
					window.location.href = '/task';
				}
				else {
					$('#modal1').modal('close');
					Materialize.toast('创建失败', 4000);
				}
			},
			error: ajaxError
		});
	});
	var card_new = new Vue({
		el: '#card_list',
		data: {
			objects: []
		},
		created: function () {
			$.ajax({
				type: "get",
				url: globalurl + "getTeam",
				xhrFields: { withCredentials: true },
				crossDomain: true,
				dataType: 'json',
				success: function (data) {
					if (data['status'] == 1) {
						for (var i = 0; i < data['data'].length; i++) {
							var object = data['data'][i];
							Vue.set(card_new.objects, i, object);
							card_new.objects.splice(i, 1, object);
						}
					}
					else {
						Materialize.toast('团队读取失败', 4000);
					}
					display(++count, ajax_num);
				},
				error: ajaxError
			});
		},
		delimiters: ['${', '}']
	})
});
