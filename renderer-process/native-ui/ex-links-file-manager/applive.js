const {shell} = require('electron')
const {ipcRenderer} = require('electron')
var fs = require("fs");
var fetch = require('node-fetch');
var FormData = require('form-data');

const exec = require('child_process').exec;
const status = document.getElementById('appstatus');

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => { 
        callback(stdout); 
    });
};

// call the function


const upload = document.getElementById('uploadapplive')
var username=document.getElementById('username').value
var key=document.getElementById('accesskey').value
upload.addEventListener('click', (event) => {
  
  async function main() {
    const filepath=document.getElementById('applivefile').files[0].path
    


  var form = new FormData();
	form.append("file", fs.createReadStream(filepath));
	
  var auth = 'Basic ' + new Buffer(username + ':' + key).toString('base64');
  

	var options = {
	  method: 'POST',
	  headers : {
	  	"Authorization" : auth,
	  },
	  body: form
  };
  
	status.innerHTML="uploading";
	const response = await fetch('https://api-cloud.browserstack.com/app-live/upload', options);
    //console.log(response);
    if (response.status='200') {
      status.innerHTML="Uploaded successfully"; 
      setInterval(function(){status.innerHTML=""}, 1000); 
      document.getElementById('applivefile').value=null;

    }
    
    
}
main() 
})
