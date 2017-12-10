$(document).ready(function () {
    var count=0;
    var ajax_num=1;
	console.log(1);
	$(".more").addClass("active");
	$.ajax({
        type: "get",
        url: globalurl+"getUser"+fail,
        dataType: 'json',
        success: function (data) {
            if(data['status']==1){
                console.log(data);
                var teamName = data['data']['teamName'];  
                $("#teamName").append(teamName);
            }
            else{
                alert('error!');
            } 
            display(++count,ajax_num);
        },
        error: ajaxError
    });
	
});