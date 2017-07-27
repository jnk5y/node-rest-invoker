FROM hypriot/rpi-node:8.1.3-onbuild

ENV GARAGE_ALERT_HOST=localhost \
    GARAGE_ALERT_PORT=6000

RUN mkdir repo && \
    cd repo && \
    git clone --single-branch --depth 1 https://github.com/jnk5y/pi_garage_alert.git && \
    cd pi_garage_alert && \
    cp bin/pi_garage_trigger.py /opt/ && \
    chmod u+x /opt/pi_garage_trigger.py && \
    cd .. && \
    rm -Rf repo/

EXPOSE 8888
