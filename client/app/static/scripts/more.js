$(document).ready(function () {

    $(".more").addClass("active");
    var teamName = $.cookie('teamName');  
    $("#teamName").append(teamName);
	display();
	
});