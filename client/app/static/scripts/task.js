 $(document).ready(function () {
	var count = 0;
	var ajax_num = 1;
	$(".task").addClass("active");

	var card_new = new Vue({
		el: '#card_list',
		data: {
			objects: []
		},
		created:function(){
			var tem=this.objects;
			$.ajax({
				type: "get",
				url: globalurl + "getTeamTask" + fail,
				dataType: 'json',
				success: function (data) {
					if (data['status'] == 1) {
						console.log(data);
						for (var i = 0; i < data['data'].length; i++) {
							var object = data['data'][i];
							var icon;
							icon = object.finished == 1 ? 'check_circle' : 'help_outline';
							object['icon'] = icon;
							Vue.set(card_new.objects, i, object);
        					card_new.objects.splice(i, 1, object);
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
        delimiters:['${', '}']  
	})
 });