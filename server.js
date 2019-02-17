'use strict';

const express = require('express');
var exec = require('child_process').exec;
//var spawn = require('child_process').spawn;
var fs = require('fs');
var process;


const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
    res.send('Specify commands\n');
});
app.get('/help', (req, res) => {
    res.send('help will be added here');
});
app.get('/-h', (req, res) => {
    // exec code here
    var child = exec("src/RefactoringMiner/bin/RefactoringMiner -h");
    var wstream = fs.createWriteStream('output.txt');
    child.stdout.on('data', function(data) {
        console.log(data);
        wstream.write(data + "\n");
    });
    child.on('close', function(code) {
        console.log(code);
        wstream.end();
    });
    res.send('-h\n');
});
// Example url: http://192.168.99.100:49160/-a?url=https://github.com/Colho/swengmeth_refminer_node.git
app.get('/-a', (req, res) => {
    // exec code here
    process = true;
    var remove = exec("rm -r temp");
    remove.on('close', function(code) {
        console.log(code);
        var child = exec("git clone " + req.query.url + " temp");
        var wstream = fs.createWriteStream('output.txt');
        child.stdout.on('data', function(data) {
            console.log(data);
        });
        child.on('close', function(code) {
            console.log(code);
            var child2 = exec("src/RefactoringMiner/bin/RefactoringMiner -a temp")
            child2.stdout.on('data', function(data) {
                console.log(data);
                wstream.write(data + "\n");
            });
            child2.on('close', function(code) {
                console.log(code);
                process = false;
                wstream.end();
                //res.download("temp/all_refactorings.csv");
            });
        });
    });
    res.send('-a\n');
});
app.get('/status', function(req, res) {
    if (process) {
        res.send('Mining in process, please wait\n');
    }
    else {
        res.send('Mining complete, get results with /download or /downloadcsv\n');
    }
});
app.get('/download', function(req, res) {
    res.download("output.txt");
});
app.get('/downloadcsv', function(req, res) {
    res.download("temp/all_refactorings.csv");
})

app.listen(PORT, HOST);
console.log('Running...');