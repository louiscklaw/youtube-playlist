#!/usr/bin/env bash

set -ex

# docker compose build downloader
docker compose restart downloader

sudo chown logic:logic -R volumes

docker compose up -d
docker compose logs -f

sudo chown 1000:1000 -R volumes

echo "done"
