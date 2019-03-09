/* 
  //负责分发路由  / /index /details
*/

var handler = require("./handler");

module.exports = function (req, res) {

  //路由处理
  var url = req.url;
  var method = req.method.toLowerCase();

  if (url === "/" || url === "/index") {
    handler.showIndex(req, res);
  } else if (url.startsWith("/details")) {
    handler.showDetails(req, res);
  } else if (url.startsWith("/submit")) {
    handler.showSubmit(req, res);
  } else if (url.startsWith("/assets")) {
    handler.showStatic(req, res);
  } else if (url.startsWith("/add") && method === "get") {
    handler.addGet(req, res);
  } else if (url.startsWith("/add") && method === "post") {
    handler.addPost(req, res);
  } else if(url.startsWith("/edit")){
    
  }else {
    handler.show404(req, res);
  }

}