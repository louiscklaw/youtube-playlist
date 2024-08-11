#!/usr/bin/env bash

set -ex

pipenv install python-dotenv

pipenv sync

while true; do
  pipenv run flask --app hello run  --host=0.0.0.0 --debug
  sleep 5
done
