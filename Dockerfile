FROM node:4-onbuild

ONBUILD COPY ./scripts/script.py /opt/script.py

EXPOSE 8888
