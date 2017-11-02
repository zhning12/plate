module.exports = function (app) {

//默认根目录：/app/views
  app.get('/', function (req, res) {
    res.render("index")
  });

  app.get('/test', function (req, res) {
    res.render("test")
  });

  app.get('/test2',function(req,res){
    res.render("test2")
  });
};

