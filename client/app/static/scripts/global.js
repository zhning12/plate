
//var globalurl = "http://39.106.147.86:7000/"
var globalurl = "http://10.10.155.102:7000/"
//var globalurl = "http://localhost:7000/"
//var globalurl = "http://result.eolinker.com/n7d6z5u6691b12046479482492142f3acfa7b501e22b581?uri=http://localhost:7000/";

var fail = "";
// var fail = "&resultType=failure";

function display(num=0,count=0) {
    if (count == num) {
        $("#main").css('display','block');
        $("#progress").remove();
    }
}

function ajaxError(XMLHttpRequest, textStatus, errorThrown) {
    console.log(XMLHttpRequest.status);
    console.log(XMLHttpRequest.readyState);
    console.log(textStatus);
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
