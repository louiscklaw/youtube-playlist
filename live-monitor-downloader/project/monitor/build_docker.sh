#!/usr/bin/env bash

set -ex

# TODO: resume me
# docker image rm -f logickee/openbox-poe-seat-base
# docker image rm -f logickee/openbox-poe-seat-apps
# docker image rm -f logickee/openbox-poe-seat-final
# docker image rm -f logickee/openbox-poe-seat

docker pull ubuntu:22.04
docker image tag ubuntu:22.04 logickee/openbox-poe-seat-base

# build openbox as base
cd dockerfiles/ubuntu
  docker build . -t logickee/openbox-poe-seat-base
cd -

# build openbox as base
cd dockerfiles/openbox
  docker build . -t logickee/openbox-poe-seat-base
cd -

# NOTE: base end here

cd dockerfiles/apps
  docker image tag logickee/openbox-poe-seat-base logickee/openbox-poe-seat-apps
  docker build -f dockerfile.nodejs . -t logickee/openbox-poe-seat-apps
  docker build -f dockerfile.vnc . -t logickee/openbox-poe-seat-apps
  docker build -f dockerfile.firefox . -t logickee/openbox-poe-seat-apps
  docker build -f dockerfile.chrome . -t logickee/openbox-poe-seat-apps
  docker build -f dockerfile.chromium . -t logickee/openbox-poe-seat-apps
  docker build -f dockerfile.python3 . -t logickee/openbox-poe-seat-apps
cd -

# finialize docker
cd dockerfiles/final
  # NOTE: do nothing but just init transfer tag at the very beginning
  docker image tag logickee/openbox-poe-seat-apps logickee/openbox-poe-seat-final

  docker build . \
    --build-arg="ANDROID_API_LEVEL=$ANDROID_API_LEVEL" \
    -t logickee/openbox-poe-seat-final
cd -

docker image tag  logickee/openbox-poe-seat-final logickee/openbox-youtube-monitor
