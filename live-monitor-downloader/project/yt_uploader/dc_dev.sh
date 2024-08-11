#!/usr/bin/env bash
set -ex

find . |entr -c -s "./build_docker.sh 2>&1 |tee  build_docker.log "
