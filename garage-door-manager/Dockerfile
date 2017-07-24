FROM hypriot/rpi-node:8.1.3-onbuild

RUN mkdir repo && \
  cd repo && \
  git clone --single-branch --depth 1 https://github.com/jnk5y/pi_garage_alert.git && \
  cd pi_garage_alert && \
  cp init.d/pi_garage_alert /etc/init.d/ && \
  cp etc/pi_garage_alert_config.py /usr/local/etc/ && \
  cp bin/pi_garage_alert.py /usr/local/sbin/ && \
  cp bin/pi_garage_trigger.py /opt/ && \
  chmod u+x /opt/pi_garage_trigger.py /usr/local/sbin/pi_garage_alert.py /usr/local/etc/pi_garage_alert_config.py && \
  cd .. && \
  rm -Rf repo/

EXPOSE 8888
