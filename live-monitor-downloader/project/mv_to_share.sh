#!/usr/bin/env bash

set -ex



mv /home/logic/_workspace/youtube-playlist/live-monitor-downloader/project/volumes/downloaded/**/*.webm /mnt/_ftp_share/logic-NUC8i5BEH/wait_upload &
mv /home/logic/_workspace/youtube-playlist/live-monitor-downloader/project/volumes/downloaded/**/*.mkv /mnt/_ftp_share/logic-NUC8i5BEH/wait_upload &
mv /home/logic/_workspace/youtube-playlist/live-monitor-downloader/project/volumes/downloaded/**/*.json /mnt/_ftp_share/logic-NUC8i5BEH/wait_upload &


wait 

echo "done"