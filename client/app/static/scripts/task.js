$(document).ready(function () {
	console.log(1);
	$(".task").addClass("active");
	$.ajax({
		type: "get",
		url: "http://result.eolinker.com/n7d6z5u6691b12046479482492142f3acfa7b501e22b581?uri=http://localhost:7000/getTeamTask",
		dataType: 'json',
		success: function (data) {
			if(data['status']==1){
				console.log(data);
				for(var i = 0; i<data['data'].length;i++){
					var object = data['data'][i];
					var icon;
					icon = object['finished']==1?'check_circle':'help_outline';
					var card_new =
					'<a class="card">'+
						'<i class="material-icons">'+icon+'</i>'+						
						'<p>'+object['name'] +'</p>'+
					'</a>';
					$(".container").append(card_new);
				}				
				var card_none = '<div class="card-none"></div>';
				for(var i =0;i<3;i++){
					$(".container").append(card_none);
				}
			}
			else{
				alert('error!');
			}
			
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
        }
	});
});