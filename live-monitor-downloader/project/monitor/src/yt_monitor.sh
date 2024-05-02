#!/bin/bash

# Set the maximum interval duration in seconds
MAX_INTERVAL_SEC=60

# Set the minimum interval duration in seconds
MIN_INTERVAL_SEC=45

# Define the command to run
# openbox-poe-seat\src\carousell-click-burner\start_chrome.js
COMMAND1="node ./yt_monitor/monitor_youtube_live.js"

while :
do
    NOW=$(date "+%Y-%m-%d %H:%M:%S")

    eval "$COMMAND1"

    OFFSET=$(((RANDOM % $(($MAX_INTERVAL_SEC-$MIN_INTERVAL_SEC))) + $MIN_INTERVAL_SEC))

    echo "THIS_ITERATION_START $THIS_ITERATION_START ..."
    echo "Waiting for $OFFSET seconds..."

    sleep $OFFSET

    sudo chown 1000:1000 -R ./volumes
done
