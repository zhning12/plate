$(document).ready(function () {
	display();
	var count = 0;
	var ajax_num = 1;
	$(".calendar").addClass("active");
	$.ajax({
		type: "get",
		url: globalurl + "getCalendarTask/" + $.cookie("teamId") + fail,
		xhrFields: {withCredentials: true},
		crossDomain: true,
		dataType: 'json',
		success: function (data) {
			if (data['status'] == 1) {
				initCalendar(data['data']);
			}
			else {
				Materialize.toast('读取任务失败', 4000);
			}
			display(++count,ajax_num);
		},
		error: ajaxError
	});
	function initCalendar(data){
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next',
				center: 'title',
				right: 'month,listMonth'
			},
			defaultDate: new Date().Format('yyyy-MM-dd'),
			navLinks: true, // can click day/week names to navigate views
			//editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: data
		});
	}
	
});