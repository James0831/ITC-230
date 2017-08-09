'use strict'
var song = require("./lib/songs.js");

const express = require("express");
const app = express();
var Song = require("./models/song");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
app.use('/api', require('cors')());

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

// details page handles GET
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

//api's

// get a single item
app.get('/api/v1/song/:artist', (req,res,next) => {
  var artist = req.params.artist;
  console.log(artist);
  Song.findOne({ artist:artist }, (err,results) => {
    if (err ||  !results) return next(err);
    res.json(results);
  });
});

//get all items
app.get('/api/v1/songs', (req,res, next) => {
    Song.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

// delete song
app.get('/api/v1/delete/:artist', (req,res, next) => {
    Song.remove({"artist":req.params.artist }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});

//adds a song
app.post('/api/v1/add/', (req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body._id) { // insert new document
        let song = new Song({artist:req.body.artist,title:req.body.title,album:req.body.album});
        song.save((err,newSong) => {
            if (err) return next(err);
            console.log(newSong)
            res.json({updated: 0, _id: newSong._id});
        });
    } else { // update existing document
        Song.updateOne({ _id: req.body._id}, {artist:req.body.artist, title: req.body.title, album: req.body.album }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});
//adds a song
app.get('/api/v1/add/:artist/:title/:album', (req,res, next) => {
    // find & update existing item, or add new 
    let artist = req.params.artist;
    Song.update({ artist: artist}, {artist:artist, title: req.params.title, album: req.params.album }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});




// custom 404 page
app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Page Not Found');
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
