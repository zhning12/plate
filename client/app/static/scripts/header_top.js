$(document).ready(function () {
    console.log(1);
    $.ajax({
        type: "get",
        url: globalurl+"getUser"+fail,
        dataType: 'json',
        async:false,
        success: function (data) {
            if(data['status']==1){
                console.log(data);
                var teamName = data['data']['teamName'];  
                $("#teamName_head").append(teamName); 
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