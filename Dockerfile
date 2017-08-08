FROM node:4-onbuild

COPY ./scripts /usr/src/app/
COPY ./certs /usr/src/app/

RUN chmod u+x /usr/src/app/*
RUN npm install request

EXPOSE 8888
