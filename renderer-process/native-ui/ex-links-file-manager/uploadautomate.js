const {shell} = require('electron')
const {ipcRenderer} = require('electron')
var fs = require("fs");
var request = require("request");
const exec = require('child_process').exec;
const autostatus = document.getElementById('appautostatus');
const getapp = document.getElementById('getapp');
const app_tab = document.getElementById('app_table');
const delete_app_id = document.getElementById('delete_app_id').value;
const app_delete_button  = document.getElementById('app_delete_button');

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
};

// call the function

app_delete_button.addEventListener('click', (event) => {

  console.log("test Delete app");
  var options = {
    method: 'DELETE',
    url: 'https://'+username+':'+key+'@api-cloud.browserstack.com/app-automate/app/delete/'+delete_app_id,

  };


  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });

});

const upload = document.getElementById('uploadappautomate')
var username=document.getElementById('username').value
var key=document.getElementById('accesskey').value

upload.addEventListener('click', (event) => {
  const filepath=document.getElementById('appautomatefile').files[0].path
  autostatus.innerHTML="uploading";
  var options = {
    method: 'POST',
    url: 'https://'+username+':'+key+'@api-cloud.browserstack.com/app-automate/upload',
    formData: {
      file: fs.createReadStream(filepath)
    }
  };


  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    autostatus.innerHTML=body;
  });
});


getapp.addEventListener('click', (event) => {
console.log("Get App functiom reachable");
var options = {
  method: 'GET',
  url: 'https://'+username+':'+key+'@api-cloud.browserstack.com/app-automate/recent_apps',
};


request(options, function (error, response, body) {
  if (error) throw new Error(error);



  var appTable = '<table>    <tr>    <th>Name</th>  <th>App_URL</th>        <th>App_Version</th>  <th>Delete</th>  </tr><tr>'
  parsedbody = JSON.parse(body);
  for(var i= 0;i<parsedbody.length;i++){
    appTable = appTable+"<td>"+parsedbody[i].app_name+"</td><td>"+parsedbody[i].app_url+"</td><td>"+parsedbody[i].app_version+"</td><td><button type='button' id='"+parsedbody[i].app_id+"' name='button'>Delete App</button></td></tr>"

  }
  appTable = appTable+"</table>"
  // console.log(appTable);
 app_table.innerHTML= appTable

});

});
