#!/bin/bash

# Start Database
echo 'Starting database'
docker run -p 27017:27017 --rm  -d --network node_server -v $PWD/database/data:/data/db --name nodeDatabase mongo:latest 

sleep 5s

# Start Backend
echo 'Starting Backend'
docker build -t nodeserver_tmp -f ./backend/Dockerfile_production ./backend
docker run -p 8080:8080 -d --network node_server -v $PWD/backend/data:/app --name nodeserver_tmp --rm nodeserver_tmp

echo 'Starting Frontend'
cd frontend && npm install && ng serve --open
wait