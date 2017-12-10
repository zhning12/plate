$(document).ready(function () {
	var count = 0;
	var ajax_num = 1;
	var teamName = $.cookie("teamName");
	$(".team").addClass("active");
	$("#teamName").append(teamName);
	objects = [];
	$.ajax({
		type: "get",
		url: globalurl + 'getMember/' + $.cookie("teamId"),
		xhrFields: {withCredentials: true},
		crossDomain: true,
		dataType: 'json',
		async: false,
		success: function (data) {
			if (data['status'] == 1) {
				objects = data['data'];
			}
			else {
				alert('error!');
			}
			display(++count,ajax_num);
		},
		error: ajaxError
	});
	var card_new = new Vue({
		el: '#member_list',
		data: {
			objects: objects
		},
		delimiters: ['${', '}']
	})
});