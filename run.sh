#!/usr/bin/env sh
docker volume create appdata
docker volume create appdb
docker stop stocial-mail-server
docker rm social-mail-server
docker pull neurospeech/social-mail-web-server
docker compose up
docker image prune -f
docker volume prune -f
docker builder prune -a -f
