# Refactoring Miner

## Building the image:
	docker build -t refminer .
You can change the image name to whatever.

## Running:
    docker run refminer -p 49160:8080

The -p tag directs the local 49160 port to the containers 8080 port. Now the container should run in docker.

## Using:
If using a normal docker installation, the url of the container is localhost:49160. If using a docker toolbox installation, the url is the url of the virtual machine that docker is using, for example 192.168.99.100:49160. Sending a get to 192.168.99.100:49160/-h outputs the -h tag of the refminer.

## Output:
Output is written to standard output. This may change in the future.

## TODO:
It is possible to use spawn instead of exec in node.js to get the output as a stream, instead of one big callback.
More options to refminer.