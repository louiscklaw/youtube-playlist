#!/usr/bin/env bash

set -ex

pipenv sync

pipenv run flask --app hello run  --host=0.0.0.0 --debug
