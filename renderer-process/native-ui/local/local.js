console.log("Hello local renderer");
const {shell} = require('electron')
const browserstack = require('browserstack-local')
const bs_local = new browserstack.Local();
const key = document.getElementById('accesskey').value
const startlocal = document.getElementById('start-local')

startlocal.addEventListener('click', (event) => {

    console.log('twat');
    console.log(key);
    console.log(bs_local.isRunning());
    if (!bs_local.isRunning()) {
      // creates an instance of Local
      // replace <browserstack-accesskey> with your key. You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
       var args = '{"key": "'+key+'"}';


       bs_local_args = JSON.parse(args);
       // bs_local_args = { key: key , args };
       // bs_local_args = { key: key , forcelocal : true };
       console.log(bs_local_args);
       // console.log(typeof bs_local_args);
      // starts the Local instance with the required arguments
      console.log(bs_local.isRunning());
       bs_local.start(bs_local_args, function() {

         if (bs_local.isRunning()) {
           console.log("Started BrowserStackLocal");
           document.getElementById('local_status').innerHTML = "LocalTesting: Running";
         }
         else {
           console.log("Issue starting Binary from Code!!");
         }

         console.log(bs_local.isRunning());



      });
    }
    else{
      console.log('Binary Already Running!!');
    }




});

// function startlocal() {
//
// };


const stoplocal = document.getElementById('stop-local')

stoplocal.addEventListener('click', (event) => {
  console.log(bs_local.isRunning());
  if (bs_local.isRunning()) {
      // stop the Local instance
      bs_local.stop(function() {
        console.log("Stopped BrowserStackLocal");
        document.getElementById('local_status').innerHTML = "LocalTesting: Not Running";

        // document.getElementsById('stop-local').setAttribute("disabled");
        // document.getElementsById('start-local').removeAttribute("disabled");

      });
  }
  else{
    console.log('Binary not Running!!');
    document.getElementById('local_status').innerHTML = "LocalTesting: Not Running";
  }
});
