FROM node:4-onbuild

COPY ./triggers /usr/src/app/
COPY ./certs /usr/src/app/

RUN chmod u+x /usr/src/app/*

EXPOSE 8888
