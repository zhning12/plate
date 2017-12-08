var http = require('http');
module.exports = function (app) {

	//默认根目录：/app/views
	app.get('/', function (req, res) {
		res.render("index")
	});

	app.get('/sign-up', function (req, res) {
		res.render("users/signUp")
	});

	app.get('/sign-in', function (req, res) {
		res.render("users/signIn")
	});

	app.get('/task', function (req, res) {
		res.render("users/task")
	});

	app.get('/add_items', function (req, res) {
		res.render("users/add_items")
	});

	app.get('/detail/*', function (req, res) {
		res.render("users/detail")
	});

	app.get('/calendar', function (req, res) {
		res.render("users/calendar")
	});

	app.get('/team', function (req, res) {
		res.render("users/team")
	});

	app.get('/person', function (req, res) {
		res.render("users/person")
	});

	app.get('/more', function (req, res) {
		res.render("users/more")
	});

	app.get('/switch', function (req, res) {
		res.render("users/switch_team")
	});


	app.get('/test', function (req, res) {
		res.render("test")
	});

	app.get('/test2', function (req, res) {
		if (req.session.user)
			res.render("test", req.session.user)
		else
			res.redirect("/")
	});

	app.post('/session/signUp', function (req, res) {
		var data = require('querystring').stringify(req.body); //数据以url param格式发送
		console.log(data);
		var opt = {
			method: "POST",
			host: "localhost",
			port: 7000,
			path: "/signUp",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',//for url parameter
				'Content-Length': data.length
			}
		};
		var reqflask = http.request(opt, function (resflask) {//建立连接 和 响应回调
			if (resflask.statusCode == 200) {
				resflask.setEncoding('utf8');
				var body = "";
				resflask.on('data', function (recData) {
					body += recData;
				});
				resflask.on('end', function () {
					req.session.user = JSON.parse(body).data;
					console.log(req.session.user);
					res.send(body); /*发送收到的响应*/
				});
			} else {
				res.send(500, "error");
			}
		});
		reqflask.write(data); //发送请求
		reqflask.end(); //请求发送完毕
	});

	app.post('/session/signIn', function (req, res) {
		var data = require('querystring').stringify(req.body); //数据以url param格式发送
		console.log(data);
		var opt = {
			method: "POST",
			host: "localhost",
			port: 7000,
			path: "/signIn",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',//for url parameter
				'Content-Length': data.length
			}
		};
		var reqflask = http.request(opt, function (apacheRes) {//建立连接 和 响应回调
			if (apacheRes.statusCode == 200) {
				apacheRes.setEncoding('utf8');
				var body = "";
				apacheRes.on('data', function (recData) {
					body += recData;
				});
				apacheRes.on('end', function () {
					req.session.user = JSON.parse(body).data;
					console.log(req.session.user);
					res.send(body); /*发送收到的响应*/
				});
			} else {
				res.send(500, "error");
			}
		});
		reqflask.write(data); //发送请求
		reqflask.end(); //请求发送完毕
	});

	app.get('/session/signOut', function (req, res) {
		var resData = {
			status: 1,
			message: 'success'
		};
		req.session.user = '';
		res.send(resData);
	});

	app.get('/session/getUser', function (req, res) {
		var resData;
		if (req.session.user) {
			resData = {
				status: 1,
				message: 'success',
				data: req.session.user
			}
		}
		else {
			resData = {
				status: 0,
				message: 'not existed'
			}
		}
		res.send(resData);
	});
};

