[![Build Status](https://travis-ci.org/Bfrn/KMS_MyCargonaut.svg?branch=master)](https://travis-ci.org/Bfrn/KMS_MyCargonaut)

# MyCargonaut Platform

## Vorrausetzung:
* Docker
* Node

# Docker Netzwerk
```
docker network create node_server
```

# Mongo Datenbank
```
cd ./database
./starting_container
```

# Node-Express Server

```
cd ./backend/data
npm install
npm run dev
```

# Angular Frontend

```
cd ./frontendAngular
npm install
ng serve
```

## Fronten Error Workaround
Wenn während des Compile-Vorgangs im Frontend ein Error auftreten sollte, sind folgende Schritte auszuführen.

```
./fixFrontend.sh
```