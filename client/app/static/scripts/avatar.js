
function textToImg(uname,size) {
    var name = uname.charAt(0);
    var fontSize = size;
    var fontWeight = 'bold';

    var canvas = document.getElementById('headImg');
    var img1 = document.getElementById('headImg');
    canvas.width = size * 2;
    canvas.height = size * 2;
    var context = canvas.getContext('2d');

    var color = ['red','#FF850A','gray','#0066CC','#2BA715','#9215A8','#85C2FF','black']
    var index = Math.floor(Math.random()*8);
    context.fillStyle = color[index];
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
    context.textAlign = 'center';
    context.textBaseline="middle";
    context.fillText(name, fontSize, fontSize);

    var code = canvas.toDataURL("image/png")
    console.log(code);

    $('.avatar').attr('src',code);
    return code;
};