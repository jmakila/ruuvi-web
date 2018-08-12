FROM docker/node:latest

RUN apt-get update
RUN apt-get install -y bluetooth bluez libbluetooth-dev libudev-dev git python make build-essential

RUN git clone https://github.com/jmakila/ruuvi-web.git /opt/ruuvi-web
RUN cd /opt/ruuvi-web
Run yarn
