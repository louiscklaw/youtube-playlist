#!/usr/bin/env bash

set -ex

docker compose build  downloader
docker compose up -d
# docker compose logs -f

echo "done"