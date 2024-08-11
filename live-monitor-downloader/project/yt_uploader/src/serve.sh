#!/usr/bin/env bash

set -ex

npm i 

while true; do
  node ./server.js
  sleep 1
done