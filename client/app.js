var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var ms = require("ms");
var nunjucks = require("nunjucks");
var compression = require('compression')
var config = require("./config/config");
var browserSync = require('browser-sync');
var session = require('express-session');
var multer = require('multer');
var nodemailer  = require('nodemailer');

var app = express();
var dir = app.get('env') == "production" ? "dist" : "app";
app.set('dir', dir);
app.set('upload',multer({ dest: dir+'/upload/' }));
app.set('view engine', 'html');
nunjucks.configure(__dirname + "/" + dir + "/views", {
    autoescape: true,
    express: app,
    watch: true
});

var mailTransport = nodemailer.createTransport({
    host : 'smtp.163.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    port: 465,
    secure: true,
    auth : {
        user : 'guanpengch@163.com',
        pass : 'g102938475610'
    },
});
app.set('mailTransport',mailTransport);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname + "/" + dir), {
    maxAge: ms("7d")
}));

app.use(cookieParser('102938475610'));
app.use(session({
    secret: '102938475610',//与cookieParser中的一致
    resave: true,
    saveUninitialized: true
    // cookie: {
    //     maxAge: 60 * 60 * 1000  // 有效期，单位是毫秒
    // }
}));

routes(app);

app.set('port', config.port.www);

var server = app.listen(app.get('port'), function () {
    browserSync({
        proxy: 'localhost:3001',
        files: ['app/**']
    });
    console.log('Express server listening on port ' + server.address().port);
});