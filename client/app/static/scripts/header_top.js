$(document).ready(function () {
	var teamName = $.cookie("teamName");
	$("#teamName_head").append(teamName);
	$("#signOut").click(function () {
		var head = ['id', 'username', 'email', 'avatar', 'teamId', 'created', 'updated', 'teamName'];
		for (item in head) {
			document.cookie = head[item] + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			window.location.href = '/';
		}
	});
});