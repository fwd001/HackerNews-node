var path = require("path");
var template = require("art-template");


module.exports = function(req, res) {
  //给res增加了一个render方法
  //表示读取文件的内容，并且渲染数据，最终响应给浏览器
  res.render = function (page, data) {
    data = data || {};
    //结合模版引擎进行渲染
    var html = template(path.join(__dirname, "views", page), data);
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.end(html);
  }

  //给res增加一个重定向的方法
  res.redirect = function(page) {
    res.statusCode = 302;
    res.setHeader("Location", page);
    res.end();
  }

  //给req增加了一个属性
  req.aa = "胡聪聪";


};