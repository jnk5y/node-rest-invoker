FROM node:4-onbuild

RUN cp ./scripts/script.py /opt/script.py && \
  chmod u+x /opt/script.py

EXPOSE 8888
