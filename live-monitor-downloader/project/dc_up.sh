#!/usr/bin/env bash

set -ex

sudo chown logic:logic -R volumes

docker compose build  downloader
docker compose up -d
# docker compose logs -f

echo "done"