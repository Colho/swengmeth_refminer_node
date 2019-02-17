# Use openjdk as base image
FROM openjdk:8-jdk

# Install node on top of java
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y curl wget
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

# Install refminer
RUN git clone https://github.com/tsantalis/RefactoringMiner.git app/src
WORKDIR /app/src
RUN ./gradlew --stacktrace distZip
RUN unzip build/distributions/RefactoringMiner.zip

# Install node server code
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080

# Go back to root for easier usage on refminer
#WORKDIR /

# Run server code
CMD ["npm", "start"]