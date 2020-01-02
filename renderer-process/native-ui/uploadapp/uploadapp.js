console.log("UPload app working here");
const {shell} = require('electron')
window.$ = window.jQuery = require('jquery')
const uploadapp = document.getElementById('uploadapp')
const getapp = document.getElementById('getapp')
// const uploadapp = document.getElementById('uploadapp')

var request = require("request");
var fs = require("fs");
uploadapp.addEventListener('click', (event) => {
console.log("upload app functiom reachable");
var options = {
  method: 'POST',
  url: 'https://rathildemo:ysJ6rj6QKHcygJrtSjPu@api-cloud.browserstack.com/app-automate/upload',
  formData: {
    file: fs.createReadStream('/Users/rathilpatel/Demo/Python/Python/common/app/apps/WikipediaSample.apk')
  }
};


request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});

});


getapp.addEventListener('click', (event) => {
console.log("Get App functiom reachable");
const username = document.getElementById('username').value
const key = document.getElementById('accesskey').value
const url = "https://"+username+":"+key+"@api-cloud.browserstack.com/app-automate/recent_apps"
console.log(url);
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', url, true)

$.get(url, function(data, status){
   alert("Data: " + data + "\nStatus: " + status);
 });


});




uploadapp.addEventListener('click', (event) => {


});
