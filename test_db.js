'use strict'

var Song = require("./models/song");

Song.count((err, result) => {
    console.log(result);
});

//inserts a new song
var newSong = Song({
    artis:"cody johnson",
    title:"wild as you",
    album: "gotta be me"
});
    
newSong.save((err) =>{
  if (err) {
	console.log(err);
  }
  else {
  	console.log("New song saved");
  }
});

// return all records
Song.find({},(err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
});

// find one song
Song.findOne({artist: 'aaron watson'}, (err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
});

Song.find({artist: 'cody johnson'}, (err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        result.remove((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('User successfully deleted!');
            }
        });
    }
});