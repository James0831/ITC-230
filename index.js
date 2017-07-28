'use strict'
var song = require("./lib/songs.js");

const express = require("express");
const app = express();
var Song = require("./models/song");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

// set up handlebars view engine
var handlebars = require('express-handlebars');
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');

// home page
app.get('/', (req,res,next) => {
  Song.find({},(err,songs) => {
    if (err) return next(err);
    res.render('home', {songs: songs});
  })
});

// about page
app.get('/about', (req,res) => {
  res.type('text/html');
  res.render('about');
});

// details page hanles GET
app.get('/details', (req,res,next) => {
  Song.findOne({ artist:req.query.artist }, (err,song) => {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: song});
  });
});

// details page. handles POST
app.post('/details', (req,res,next) => {
    Song.findOne({ artist:req.body.artist }, (err, song) => {
    if (err) return next(err);
    res.type('text/html');
    res.render('details', {result: song});
  });
});

// delete page
app.get('/delete', (req,res,next) => {
  Song.remove({ title:req.query.title }, (err, result) => {
        if (err) return next(err);
        var deleted = result.result.n !== 0; // n will be 0 if no docs deleted
        Song.count((err, total) => {
            res.type('text/html');
            res.render('delete', {title: req.query.title, deleted: result.result.n !== 0, total: total } );    
        });
    });
});

// handle GET 
app.get('/add', (req,res) => {
    let result = song.add(req.query.artist); // adds song 
    res.render('added', {title: req.query.artist, result: result});
});

// custom 404 page
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error;');
  });
  
app.listen(app.get('port'), () => {
  console.log( 'Express started');
});
