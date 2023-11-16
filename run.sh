#!/usr/bin/env sh
mkdir -p ./app_db
docker volume create app_data
docker stop social-mail-server
docker rm social-mail-server
docker pull neurospeech/social-mail-web-server
docker compose up -d
docker image prune -f
docker volume prune -f
docker builder prune -a -f
