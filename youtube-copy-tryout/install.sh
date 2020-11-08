#!/usr/bin/env bash

set -ex

./install-youtube-dl.sh &
./install-youtube-upload.sh &

wait

youtube-dl --version
pipenv run youtube-upload --version

echo 'install done'
