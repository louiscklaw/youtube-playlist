#!/usr/bin/env bash

set -ex

TMP_DIR=$(mktemp -d)

rm -rf master* || true
rm -rf youtube-upload-master || true

pipenv install google-api-python-client oauth2client progressbar2

wget https://github.com/tokland/youtube-upload/archive/master.zip
unzip master.zip

pushd youtube-upload-master
  pipenv run python setup.py install
popd

rm -rf master*
rm -rf youtube-upload-master

pipenv run youtube-upload --help
