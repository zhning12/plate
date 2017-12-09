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

var app = express();
var dir = app.get('env') == "production" ? "dist" : "app";

app.set('view engine', 'html');
nunjucks.configure(__dirname + "/" + dir + "/views", {
    autoescape: true,
    express: app,
    watch: true
});

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