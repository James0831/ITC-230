var http = require("http"), fs = require('fs'), qs = require("querystring");
var songs = require("./lib/songs.js");

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  console.log(__dirname + path)
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}

http.createServer(function(req,res){
  var url = req.url.split("?"); // separate route from query string
  var params = qs.parse(url[1]); // conver query string to object
  var path = url[0].toLowerCase();
  
  switch(path) {
    case '/': 
      serveStatic(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      serveStatic(res, '/public/about.html', 'text/html');
      break;
    case '/get':
      var song = songs.get(params.artist);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var result = (song) ? JSON.stringify(song) : 'Could not find that artist';
      res.end('The results for ' + params.artist + ' are: \n' + result);
      break;
    case '/delete':
      var song = songs.delete(params.artist);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var result = (song) ? JSON.stringify(song) : 'Could not find that artist';
      res.end(result);
      break;
      /*
    case '/add':
      var song = songs.add(params.newSong);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('The new artist added is: ' + params.artist)
      */
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404:Page not found.');
  }
  
}).listen(process.env.PORT || 3000);


