//methods to get all items, and get or delete an item. Export these methods 
//for use by other scripts.
var songs = [
    {artist: "aaron watson", title: "july in cheyenne", album: "real good time"},
    {artist: "cody jinks", title: "im not the devil", album: "im not the devil"},
    {artist: "dean brody", title: "gravity", album: "dean brody"}
];

//gets everything inside of the array
exports.getAll = () => {
    return songs;
};
//console.log(this.getAll()); 
  
//gets the artist from the array
exports.get = (artist) => {
    return songs.find((song) => {
        return song.artist === artist;
    });
};

//console.log(this.get("Aaron Watson"));


//filters out the artist from the array
exports.delete = (artist) => {
    const oldLength = songs.length;
    var newSongs = songs.filter((song) => {
        return song.artist !== artist;
    });
    songs = newSongs;
    // if there was an item deleted
    return {deleted: oldLength !== songs.length, total: songs.length};
};

exports.add = (newSong) => {
    const oldLength = songs.length;
    // use existing get() method to check if book already in our list
    var found = this.get(newSong.artist);
    if (!found) {
        songs.push(newSong);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== songs.length, total: songs.length };
};

//console.log(this.delete("Aaron Watson"));
//console.log(this.getAll());