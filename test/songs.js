'use strict'
const expect = require("chai").expect;
const song = require("../lib/songs");

describe("Tests 'get', 'add', 'delete', for songs.js", () => {
    
    beforeEach(() => {
    // runs before all tests in this block
    //console.log(song.getAll());
    });
    
    it("returns requested songs by artist", () => {
        var result = song.get("aaron watson");
        expect(result).to.deep.equals({artist: "aaron watson", title: "july in cheyenne", album: "real good time"});
    });
    
    it("fails to return a song", () => {
        var result = song.get("no artist");
        expect(result).to.be.undefined;
    });
    
    it("adds a new song", () => {
        var result = song.add({artist: "cody johnson", title:"wild as you", album:"gotta be me"});
        expect(result.added).to.be.true;
    });
    
    it("fails to add existing song", () => {
        var result = song.add({artist: "aaron watson", title: "july in cheyenne", album: "real good time"});
        expect(result.added).to.be.false;
    });
    
    it("deletes an existing song", () => {
        var result = song.delete("cody johnson");
        expect(result.deleted).to.be.true;
    });
    
    it("fails to delete a non existing or invalid song", () => {
        var result = song.delete("cody johnson");
        expect(result.deleted).to.be.false;
    });
    
});