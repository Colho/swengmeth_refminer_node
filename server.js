'use strict';

const express = require('express');
//var exec = require("child_process").exec;
//var http = require('http');
var exec = require('child_process').exec;

//create a server object:
/*http.createServer(function (req, res) {
    console.log(req.url);
    exec("src/RefactoringMiner/bin/RefactoringMiner -h", function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
    });
    // Wrong path
    exec("src/build/distributions/RefactoringMiner/bin/RefactoringMiner -h", function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    res.write('yaas'); //write a response to the client
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
*/
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
    res.send('Specify commands\n');
});
app.get('/-h', (req, res) => {
    // exec code here
    exec("src/RefactoringMiner/bin/RefactoringMiner -h", function(error, stdout, stderr) {
        console.log(stdout);
    });
    res.send('-h\n');
});

app.listen(PORT, HOST);
console.log('Running on http://${HOST}:${PORT}');