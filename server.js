'use strict';

const express = require('express');
var exec = require('child_process').exec;
//var spawn = require('child_process').spawn;
var fs = require('fs');
var process = false;


const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

// Server side code to access refminer inside a docker container.
// Basically all the refminer functions follow a simple route:
// Remove temp folder, clone the wanted repo, run refminer and log the output
// When the mining is done, the user can download the files with different urls
// Mining process can be checked with a different url

// TODO:
// Error handling in various places
// Make sure that it works in various cases
// Better UI


// Help functions and debugging
app.get('/', (req, res) => {
    res.send('<h1>Useful commands for RefMiner:</h1>\n' + 
    '<p>Analyze all the commits for one repo: /-a?url=[giturl]\n' + 
    '<p>Analyze only one commit for repo:     /-c/[commit]?url=[giturl]\n' + 
    '<p>Analyze repo between two commits:     /-bc/[commit1]/[commit2]?url=[giturl]\n' +
    '<p>Get the status of the mining process: /status\n' +
    '<p>Download output as text file:         /download\n' +
    '<p>Download output as csv file:          /downloadcsv\n' +
    '<p>All the commands are meant to be used as a suffix for this containers basic url!');
});
app.get('/help', (req, res) => {
    res.send('Help will be added here? Maybe?');
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

// Function to analyze all commits. works with suffix /-a?url=<url>
// Example url: http://192.168.99.100:49160/-a?url=https://github.com/Colho/swengmeth_refminer_node.git
app.get('/-a', (req, res) => {
    // exec code here
    if (!process) {
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
        res.send('<h1>Mining in progress, please wait\n' +
        '<p>Your results will be available in /status soon');
    }
    else {
        res.send('<h1>Mining in progress, please wait\n');
    }
});

// Function to analyze one commit, with the suffix /-c/<commit>?url=<url>
// Example url: http://192.168.99.100:49160/-c/8adde7ff151222651aac509b5ede46ac39eff82a?url=https://github.com/Colho/swengmeth_refminer_node.git
app.get('/-c/:commit', (req, res) => {
    // exec code here
    var params = {
        "commit" : req.params.commit
    }
    if (!process) {
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
                var child2 = exec("src/RefactoringMiner/bin/RefactoringMiner -c temp " + params.commit)
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
        res.send('<h1>Mining in progress, please wait\n' +
        '<p>Your results will be available in /status soon');
    }
    else {
        res.send('<h1>Mining in progress, please wait\n');
    }
});

// Function to analyze repo between two commits, with the suffix /-bc/<commit1>/<commit2>?url=<url>
// Example url: http://192.168.99.100:49160/-bc/a3e971e44aafc7458ef3b9ec28874519c8170431/8adde7ff151222651aac509b5ede46ac39eff82a/?url=https://github.com/Colho/swengmeth_refminer_node.git
app.get('/-bc/:commit1/:commit2', (req, res) => {
    // exec code here
    var params = {
        "commit1" : req.params.commit1,
        "commit2" : req.params.commit2
    }
    if (!process) {
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
                var child2 = exec("src/RefactoringMiner/bin/RefactoringMiner -bc temp " + params.commit1 + " " + params.commit2);
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
        res.send('<h1>Mining in progress, please wait\n' +
        '<p>Your results will be available in /status soon');
    }
    else {
        res.send('<h1>Mining in progress, please wait\n');
    }
});


// Helper functions
app.get('/status', function(req, res) {
    if (process) {
        res.send('<h1>Mining in process, please wait\n');
    }
    else {
        res.send('<h1>Mining complete <p>get results with /download or /downloadcsv\n');
    }
});
app.get('/download', function(req, res) {
    res.download("output.txt");
});
app.get('/downloadcsv', function(req, res) {
    res.download("temp/all_refactorings.csv");
});

app.listen(PORT, HOST);
console.log('Running...');