module.exports = function (app) {

	//默认根目录：/app/views
	app.get('/', function (req, res) {
		res.render("index")
	});

	app.get('/test', function (req, res) {
		res.render("test")
	});

	app.get('/test2', function (req, res) {
		res.render("users/test2")
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

	app.get('/choose', function (req, res) {
		res.render("users/choose_team")
	});

	app.get('/mine', function (req, res) {
		res.render("users/mine")
	});

	app.get('/person', function (req, res) {
		res.render("users/person-given")
	});

	app.get('/person-get',function(req,res){
		res.render("users/person-get")
	});

	app.get('/test2',function(req,res){
		res.render("users/test2")
	});
};

