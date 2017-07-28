var credentials = require("../lib/credentials");
var mongoose = require('mongoose');

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(credentials.mongo.development.connectionString, options);

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));


// values indicate the data type of each key
var mySchema = mongoose.Schema({
 artist: String,
 title: String,
 album: String
}); 

module.exports = mongoose.model('Song', mySchema);