'use strict'

let fetch = require("node-fetch");

let url = "https://itc230-james0831.c9users.io";

// get request

fetch(url+ "/api/v1/books").then((response) => {
  return response.json();
}).then((results) => {
  console.log(results)  
});

/*
let book = {title:'europe',author:'frommers',pubdate:1980}
fetch(url + "/api/v1/add/", {
  method: "POST",
	headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(book)
}).then(res => res.json())
	.then(json => console.log(json));
*/