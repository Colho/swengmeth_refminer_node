# Refactoring Miner

## Building the image:
	docker build -t refminer .
You can change the image name to whatever.

## Running:
    docker run -p 49160:8080 refminer

The -p tag directs the local 49160 port to the containers 8080 port. Now the container should run in docker.

## Connecting to the container:
If using a normal docker installation, the url of the container is 'localhost:49160'. If using a docker toolbox installation, the url is the url of the virtual machine that docker is using, for example '192.168.99.100:49160'. Now you can use browser to go to the correct site. Help is presented at index.

## Basic use
After commissioning a mining process with the selector /-c, /-a or /-bc, it might take a while to get the results. You can check the status of the mining process from '/status'. After the mining is done, you can download the raw output from '/download' and the detailed information from '/downloadcsv'. 

## TODO:
- It is possible to use spawn instead of exec in node.js to get the output as a stream, instead of one big callback.
- Better UI
- Error handling
- Make sure that it works
- Ease of use