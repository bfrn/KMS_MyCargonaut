#! /bin/bash
docker run -p 8080:8080 -it -e DBUSERNAME=simon -e DBPASSWORD=123 --network node_server -v $PWD/data:/app --name nodeServ --rm nodeserver

