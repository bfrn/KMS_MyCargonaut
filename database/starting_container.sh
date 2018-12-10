#!/bin/bash
docker run -p 27017:27017 --rm  --network node_server -v $PWD/data:/data/db --name nodeDatabase mongo:latest 
