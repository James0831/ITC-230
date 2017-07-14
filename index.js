'use strict'
let song = require("./lib/songs.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
// set up handlebars view engine
var handlebars = require('express-handlebars');
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');

// home page send a static file
app.get('/', function(req, res){
  res.type('text/html');
  res.render('home', {songs: song.getAll()});
});

// about page
app.get('/about', function(req, res){
  res.type('text/html');
  res.render('about');
});

// details page
app.get('/details', function(req, res){
  console.log(req.query)
  var found = song.get(req.query.artist);
  res.render("details", {artist: req.query.artist, result: found, songs: song.getAll()});
});

app.post('/details', function(req,res){
    console.log(req.body)
    var found = song.get(req.body.artist);
    res.render("details", {artist: req.body.artist, result: found, songs: song.getAll()});
});

// handle GET 
app.get('/delete', function(req,res){
    let result = song.delete(req.query.artist); // delete book object
    res.render('delete', {title: req.query.artist, result: result});
});






// custom 404 page
app.use(function(req, res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error;');
  });
  
app.listen(app.get('port'), function(){
  console.log( 'Express started');
});
