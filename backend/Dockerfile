FROM node:latest
MAINTAINER Simon Stockhause
WORKDIR /app
RUN ls && ls -al
RUN npm install
WORKDIR /app
#RUN apt-get update && apt-get install -yqq vim
CMD npm test
