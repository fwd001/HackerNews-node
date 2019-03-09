var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

var server = http.createServer();



//路由： 根据不同的url，映射到不同的处理的代码
// localhost:9999/index   ====> index.html
// localhost:9999/submit  ====> submit.html
// localhost:9999/details ====> details.html
// localhost:9999/add     ====> 需要把数据给存储起来，跳到index页面
server.on("request", function (req, res) {

  //渲染某个具体的html页面
  function render(page) {
    fs.readFile(path.join(__dirname, "views", page), function (err, data) {
      if (err) {
        res.writeHead(404, {
          "content-type": 'text/html;charset=utf-8'
        });
        res.end("404, 你要访问的页面不存在");
        return;
      }
      res.setHeader("content-type", "text/html;charset=utf-8");
      res.end(data);
    });
  }

  function renderStatic(url) {
    res.setHeader("content-type", mime.getType(url));
    fs.readFile(path.join(__dirname, url), function (err, data) {
      if (err) {
        res.writeHead(404, {
          "content-type": 'text/html;charset=utf-8'
        });
        res.end("404, 你要访问的页面不存在");
        return;
      }

      res.end(data);
    });
  }

  var url = req.url;

  console.log(url);
  //访问index.html页面
  if (url === "/" || url === "/index") {
    render("index.html");
  } else if (url === "/submit") {
    render("submit.html");
  }
  else if (url.startsWith("/details")) {
    render("details.html");
  }
  //如果url以/assets开头，说明都是静态资源，直接读取，直接响应
  else if (url.startsWith("/assets")) {
    renderStatic(url);
  }
  else {
    //如果碰到没有处理的内容，统一返回404
    res.writeHead(404, {
      "content-type": 'text/html;charset=utf-8'
    });
    res.end("404, 你要访问的页面不存在");
  }

});


server.listen(9999, function () {
  console.log("服务器启动成功了");
});


