$(document).ready(function () {
	console.log(1);
	$(function(){
		textToImg('Joy', 30);
	});
	
	$(".container").css("display","none");
	$(".person").addClass("active");
	var objects1 = [];
	var objects2 = [];
	$.ajax({
		type: "get",
		url: globalurl + "getSendTask" + fail,
		dataType: 'json',
		async: false,
		success: function (data) {
			if (data['status'] == 1) {
				console.log(data);
				var objects1=data['data'];
				for(var i=0;i<data['data'].length;i++){
					object = data['data'][i];
					checkbox= "checkbox_"+object['id'];
					object['checkbox_id']=checkbox;
					objects1[i]=object;
				}
			}
			else {
				alert('error!');
			}

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
			tasks: objects1
		},
		delimiters: ['${', '}']
	});
	var tab2_add = new Vue({
		el: '#tab2',
		data: {
			tasks_2: objects2
		},
		delimiters: ['${', '}']
	});
	
	$(".container").css("display", "flex");
});