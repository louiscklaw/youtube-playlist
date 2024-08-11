# README

split into 3 dockers

downloader : to download the youtube video by id (python)
yt_uploader: to upload youtube video (openbox + puppeteer + js)
monitor: to monitor specific youtube channel (openbox + puppeteer + js)

### dev

```bash
# on host machine
cd project
./dc_up.sh

# on host machine
# monitor, open browser
# goto http://192.168.10.21:6090/
# start terminal
cd apps
./yt_monitor.sh

# yt_uploader, open browser
# goto http://192.168.10.21:6091/
# start terminal
cd apps
./serve.sh
```
