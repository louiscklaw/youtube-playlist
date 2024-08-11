---
tags: live-monitor-downloader
---

```bash
$ docker compose up -d

# for uploader
# 1. vnc to port 6091
# 2. cd app
# 3. ./serve.sh

# for downloader
# just let docker container run, no special steps

# for monitor
# 1. vnc to start monitor
# 2. cd app
# 3. ./yt_monitor.sh

```

# NOTES

## containers

- stub
- yt-monitor
- yt-downloader
  - healthy url: http://192.168.10.21:3010/helloworld
- yt-uploader
  - healthy url: http://192.168.10.21:3011/helloworld

https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/

```bash
cp -r /home/logic/_workspace/youtube-playlist/live-monitor-downloader/project/volumes/downloaded/ftsnj/ /mnt/_ftp_share/logic-NUC8i5BEH

```
