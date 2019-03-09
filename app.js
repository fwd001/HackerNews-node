var http = require("http");
var router = require("./router");
var extend = require("./extend");


var server = http.createServer();


server.on("request", function (req, res) {

  //加载一个extend模块，这个模块负责给req和res增加一些方法
  extend(req, res);


  //加载router模块，这个模块负责，所有请求相关的工作交给路由
  router(req, res);
});

server.listen(9999, function () {
  console.log("服务器启动成功了");
});

