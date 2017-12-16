$(document).ready(function () {
	display();
	var dateStr = "16 December 2017";
	var d = new Date(dateStr);
	console.log(d);
	
	var d = new Date(dateStr).Format("yyyy-MM-dd");
	console.log(d);
});