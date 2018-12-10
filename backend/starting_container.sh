#!/bin/bash
docker run -p 8080:8080 -it --network node_server -v $PWD/data:/app --name nodeServ --rm nodeserver

