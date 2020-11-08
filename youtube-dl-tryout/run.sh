#!/usr/bin/env bash

set -ex

rm -rf *.mkv

pipenv run youtube-dl -f 'bestvideo[height<=1920]+bestaudio/best[height<=1920]' -o 'helloworld.mkv' 4XXR0ybTokA

ls -l *.mkv
