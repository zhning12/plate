$(document).ready(function () {
    var teamName = $.cookie("teamName"); 
    $("#teamName_head").append(teamName); 
    $("#signOut").click(function(){
        $.ajax({
			type: "get",
			url: "/session/signOut",
			success: ajaxSuccess,
			error: ajaxError
		});
    });

    function ajaxSuccess(data){
		if (data["status"] == 1) {
			window.location.href = '/sign-in';
		}
		else {

		}
    }
});