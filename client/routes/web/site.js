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

	app.get('/task', function (req, res) {
		res.render("users/task")
	});

	app.get('/add_items', function (req, res) {
		res.render("users/add_items")
	});

	app.get('/detail/*', function (req, res) {
		res.render("users/detail")
	});

	app.get('/calendar',function(req,res){
		res.render("users/calendar")
	});
	
	app.get('/team',function(req,res){
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

};

