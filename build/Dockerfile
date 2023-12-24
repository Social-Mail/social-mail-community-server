ARG NODE_VERSION=21

FROM node:${NODE_VERSION}-bullseye AS node

VOLUME /var/lib/clamav
VOLUME /data

RUN apk add --no-cache tini
RUN apk add 7zip clamav && \
    sed -i 's/^#Foreground .*$/Foreground yes/g' /etc/clamav/clamd.conf && \
    echo "TCPAddr 0.0.0.0" >> /etc/clamav/clamd.conf && \
    echo "TCPSocket 3310" >> /etc/clamav/clamd.conf && \
    sed -i 's/^Foreground .*$/Foreground true/g' /etc/clamav/freshclam.conf && \
    freshclam && \
    chown clamav:clamav /var/lib/clamav/*.cvd && \ 
    mkdir /var/run/clamav && \
    chown clamav:clamav /var/run/clamav && \
    chmod 750 /var/run/clamav

RUN sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
RUN sudo apt-get update
RUN sudo apt-get -y install postgresql

WORKDIR /app
COPY package*.json ./
COPY index.js ./
RUN npm install --omit=dev
ENV HOST 0.0.0.0
ENV PORT 80
ENV SELF_HOST true
EXPOSE 80 443 25

ENV POSTGRES_PASSWORD none
ENV SOCIAL_MAIL_DB_PASSWORD none
ENV PG_DATA /data/db

ENTRYPOINT ["/sbin/tini", "--", "npm", "start"]