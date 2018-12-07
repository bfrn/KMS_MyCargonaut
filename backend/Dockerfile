FROM node:latest
MAINTAINER Simon Stockhause
COPY ./backend/app ./app
RUN apt-get update && apt-get install -yqq vim
CMD npm test
