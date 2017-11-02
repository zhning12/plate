module.exports = function (app) {

//默认根目录：/app/views
  app.get('/', function (req, res) {
    res.render("login")
  });

  app.get('/test', function (req, res) {
    res.render("test")
  });

  app.get('/sign_up',function(req,res){
    res.render("sign_up")
  });
};

