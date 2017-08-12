FROM node:4-onbuild

COPY ./triggers /usr/src/app/
COPY ./certs /usr/src/app/

RUN chmod u+x /usr/src/app/*
RUN apt-get update && apt-get install -y \
	python-pip \
	python-lxml && \
	pip install \
	requests \
	parse

EXPOSE 8888
