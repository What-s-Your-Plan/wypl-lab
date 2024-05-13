#!/bin/sh

# Variable
PROFILE="$1" #"dev"
PORT="$2"
NAME="$3" #"wypl-web-dev"
VOLUME_PATH="$4"
TAG="latest"

# Build Docker Image
echo "Building Docker image..."
docker build -t "$NAME":"$TAG" .

# date tag
# DATE_TAG=$(date +%y%m%d%H%M)
# docker build -t "$REPOSITORY_NAME":"$DATE_TAG" .

# Deploy
if [ $(docker ps -aq -f name=$NAME) ]; then
    echo 'Stopping and removing Docker container...'
    docker stop $NAME
    docker rm $NAME
fi
echo "Deploy Spring Boot!!"
docker run -d --name $NAME -e PROFILE=$PROFILE -p $PORT:8080 -v /home/ubuntu/$VOLUME_PATH/logs:/logs $NAME:$TAG