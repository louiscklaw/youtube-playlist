#!/usr/bin/env bash

set -ex

TMP_DIR=$(mktemp -d)

pushd $TMP_DIR
  curl -L https://github.com/l1ving/youtube-dl/releases/latest/download/youtube-dl -o ./youtube-dl
popd

rsync -avzh $TMP_DIR/youtube-dl .

chmod +x youtube-dl
