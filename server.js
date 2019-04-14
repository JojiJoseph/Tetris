let nodeStatic = require('node-static');
let file = new nodeStatic.Server('./');

require('http').createServer(function(request, response) {
  request.addListener('end', function() {
    file.serve(request, response);
  }).resume();
}).listen(process.env.PORT||8080);
