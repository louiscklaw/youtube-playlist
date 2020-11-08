#!/usr/bin/env bash

set -ex

video_link='https://www.youtube.com/watch?v=7k_E5xaOoAs'

trap 'catch' ERR
catch() {
  pwd
  ls -l *.mp4 || true
  ls -l *.mkv || true
  echo "An error has occurred but we're going to eat it!!"
}

rm -rf *.part

TMP_DIR=$(mktemp -d)
PROJ_HOME=$PWD

# pushd $TMP_DIR
  # rsync -avzh $PROJ_HOME/ .

  # ./install-youtube-upload.sh &
  # ./install-youtube-dl.sh &

  # # wait until pipenv sync finish
  # wait

  echo 'cp start'

  pipenv run python ./main.py

  echo 'cp done'
