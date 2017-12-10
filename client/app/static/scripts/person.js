$(document).ready(function () {
	var count = 0;
	var ajax_num = 2;
	$(".person").addClass("active");

	var username = $.cookie("username");
	$("#user_name").append(username);
	var email=$.cookie("email");
	$("#e-mail").append(email);
	var avatar=$.cookie("avatar");
	$("#avatar").attr("src",avatar);

	var tab1_add = new Vue({
		el: '#tab1',
		data: {
			tasks: []
		},
		created:function(){
			$.ajax({
				type: "get",
				url: globalurl + "getSendTask" + fail,
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