$(document).ready(function () {
	var count = 0;
	var ajax_num = 3;
	$(function(){
		textToImg('关鹏', 100);
	});
	
	$(".person").addClass("active");
	$.ajax({
		type: "get",
		url: globalurl + "getUser" + fail,
		dataType: 'json',
		success: function (data) {
			if (data['status'] == 1) {
				console.log(data);
				var username = data['data']['username'];
				$("#user_name").append(username);
				var email=data['data']['email']
				$("#e-mail").append(email);
				var avatar=data['data']['avatar']
				//document.getElementById("avatar").src=avatar;
			}
			else {
				alert('error!');
			}
			display(++count,ajax_num);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});

	var tab1_add = new Vue({
		el: '#tab1',
		data: {
			tasks: []
		},
		created:function(){
			$.ajax({
				type: "get",
				url: globalurl + "getSendTask" + fail,
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
						alert('error!');
					}
					display(++count,ajax_num);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
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
				url: globalurl + "getReceiveTask" + fail,
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
						alert('error!');
					}
					display(++count,ajax_num);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		},
		delimiters: ['${', '}']
	});
});