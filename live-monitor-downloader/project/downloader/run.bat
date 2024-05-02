#!/usr/bin/env bash

set -ex

flask --app hello run  --host=0.0.0.0 --debug
