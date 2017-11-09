module.exports = function (app) {

	//默认根目录：/app/views
	app.get('/', function (req, res) {
		res.render("index")
	});

	app.get('/test', function (req, res) {
		res.render("test")
	});

	app.get('/sign-up', function (req, res) {
		res.render("users/signUp")
	});

	app.get('/sign-in', function (req, res) {
		res.render("users/signIn")
	});

	app.get('/mine', function (req, res) {
		res.render("users/mine")
	});
};

