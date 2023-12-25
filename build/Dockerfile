ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine AS node

FROM postgres:16.1-alpine

VOLUME /var/lib/clamav
VOLUME /data
VOLUME /db-backup

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

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
RUN cp /usr/local/bin/docker-entrypoint.sh /usr/local/bin/postgres-entrypoint.sh
COPY --from=node /usr/local/bin /usr/local/bin
COPY ./setup /docker-entrypoint-initdb.d
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY index.js ./
ENV HOST 0.0.0.0
ENV PORT 80
ENV SELF_HOST true
EXPOSE 80 443 25

ENV POSTGRES_PASSWORD none
ENV SOCIAL_MAIL_DB_PASSWORD none
ENV PG_DATA /data/db
ENV POSTGRES_INITDB_WALDIR /db-backup

ENTRYPOINT ["/sbin/tini", "--", "npm", "start"]