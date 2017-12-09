$(document).ready(function () {
	var count = 0;
	var ajax_num = 1;
	var objects = [];
	$(".task").addClass("active");
	$.ajax({
		type: "get",
		url: globalurl + "getMember" + fail,
		dataType: 'json',
		async: false,
		success: function (data) {
			if (data['status'] == 1) {
				for (var i = 0; i < data['data'].length; i++) {
					var object = data['data'][i];
					checkbox = "checkbox-" + object['id'];
					object['checkbox_id'] = checkbox;
					objects[i] = object;
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
	var card_new = new Vue({
		el: '#member_list',
		data: {
			members: objects
		},
		delimiters: ['${', '}']
	});
	
});
//全选和全不选（第一个参数为复选框名称，第二个参数为是全选还是全不选）  
function allCheck() {

		$('.mdl-checkbox').toggleClass('is-checked');

}  

