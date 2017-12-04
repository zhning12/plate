

$(document).ready(function () {
	console.log(1);
	$(".container").css("display","none");
	$(".person").addClass("active");
	$.ajax({
		type: "get",
		url: globalurl + "getSendTask" + fail,
		dataType: 'json',
		async:false,
		success: function (data) {
			if (data['status'] == 1) {
				console.log(data);
				for (var i = 0; i < data['data'].length; i++) {
					var object = data['data'][i];
					var icon;
					icon = object['finished'] == 1 ? 'check_circle' : 'help_outline';
					var card_new = '<a href="/task/1">' +
						'<div class="todo break-word">' +
						'<div class="name ">' +
						'<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-' + object['id'] + '">' +
						'<input type="checkbox" id="checkbox-' + object['id'] + '"class="mdl-checkbox__input">' +
						'<span class="mdl-checkbox__label todo-text">' + object['name'] + '</span>' +
						'</label>' +
						'</div>' +
						'<div class="info truncate-text">' +
						'<span class="asignee">' +
						'<img src="" class="avater">' + object['leader'] +
						'</span>' +
						'<span class="due-at">' +
						'<i class="material-icons">schedule</i>' +
						object['deadline'] +
						'</span>' +
						'</div>' +
						'</div>' +
						'</a>';
					$("#tab1").append(card_new);
				}
				var card_none = '<div class="card-none"></div>';
				for (var i = 0; i < 3; i++) {
					$(".container").append(card_none);
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
	$("#progress").css("display","none");
	$(".container").css("display","flex");
	
});