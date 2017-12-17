var http=require("http");
module.exports = function (app) {

	app.use(function (req, res, next) {
		if (req.path == '/' || req.path == '/sign-up' || req.path == '/sign-in' || req.path == '/test') {
			next();
		}
		else if (req.cookies.id != null) {
			if (req.cookies.teamId != "null") {
				next();
			}
			else {
				if (req.path == '/switch')
					next();
				else
					res.redirect("/switch");
			}
		}
		else {
			res.redirect("/");
		}
	});

	//默认根目录：/app/views
	app.get('/', function (req, res) {
		res.render("index")
	});

	app.get('/sign-in', function (req, res) {
		res.render("users/signIn")
	});

	app.get('/task', function (req, res) {
		res.render("users/task")
	});

	app.get('/add_items', function (req, res) {
		res.render("users/addItems")
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
		res.render("users/switch")
	});

	// 单图上传
	app.post('/upload', app.get('upload').array('pFile',5), function (req, res, next) {
		var files = req.files;
		var resData = [];
		for(var index in files){
			resData.push( files[index].path.replace(app.get('dir')+'\\upload\\','') )
			console.log('文件类型：%s', files[index].mimetype);
			console.log('原始文件名：%s', files[index].originalname);
			console.log('文件大小：%s', files[index].size);
			console.log('文件保存路径：%s', files[index].path);
		}
		resData = resData.join(',');
		res.json(resData);
	});

	app.get('/email', function(req, res, next) {
		var options = {
			from        : 'guanpengch@163.com',
			to          : '875499765@qq.com',
			// cc         : ''  //抄送
			// bcc      : ''    //密送
			subject        : 'absdfsadf',
			//text          : '我是啊啊啊',
			html           : 'absdfsadf'
		};
		
		app.get('mailTransport').sendMail(options, function(err, msg){
			if(err){
				console.log(err);
				res.render('index', { title: err });
			}
			else {
				console.log(msg);
				res.render('index', { title: "已接收："+msg.accepted});
			}
		});
	});

	app.get('/test', function (req, res) {
		res.render("test")
	});

	app.get('/test2', function (req, res) {
		if (req.session.user) {
			for (var key in req.session.user) {
				res.cookie(key, req.session.user[key]);
			}
			res.render("test")
		}
		else
			res.redirect("/")
	});
};

