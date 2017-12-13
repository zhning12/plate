$(document).ready(function () {
    var teamName = $.cookie("teamName");  
    $("#teamName").append(teamName);
    display();
});