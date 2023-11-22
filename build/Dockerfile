ARG NODE_VERSION=18.16.0

FROM node:${NODE_VERSION}-alpine AS node

FROM postgres:16.1-alpine3.18

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

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

WORKDIR /app
COPY package*.json ./
COPY index.js ./
RUN npm install --omit=dev
ENV HOST 0.0.0.0
ENV PORT 80
ENV SELF_HOST true
EXPOSE 80 443 25
ENTRYPOINT ["/sbin/tini", "--", "npm", "start"]