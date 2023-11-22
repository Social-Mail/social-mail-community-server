#!/usr/bin/env sh
mkdir -p ./app_db
docker volume create app_data
docker stop social-mail-server
docker rm social-mail-server
docker run --name=social-mail-server --env-file ./vars.env -p 25:25 -p 443:443 -p 80:80 -v ./app_db:/data --restart=always -d neurospeech/social-mail-web-server-community:latest
docker image prune -f
docker volume prune -f
docker builder prune -a -f
