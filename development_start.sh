#!/bin/bash

# Start Database
echo 'Starting database'
docker run -p 27017:27017 --rm  -d --network node_server -v $PWD/database/data:/data/db --name nodeDatabase mongo:latest 

sleep 5s

# Start Backend
echo 'Starting Backend'
docker build -t nodeserver_tmp -f ./backend/Dockerfile_production ./backend
docker run -p 8080:8080 -it --network node_server -v $PWD/backend/data:/app --name nodeServ --rm nodeserver_tmp


wait