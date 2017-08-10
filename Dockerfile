FROM node:4-onbuild

COPY ./scripts /usr/src/app/
COPY ./certs /usr/src/app/

RUN chmod u+x /usr/src/app/*
RUN echo -n $pass | sha256sum | awk '{print $1}' > pass.txt

EXPOSE 8888
