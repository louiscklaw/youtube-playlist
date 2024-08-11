# rm -rf /home/logic/_workspace/youtube-playlist/live-monitor-downloader/project/volumes/downloaded/*
# touch /home/logic/_workspace/youtube-playlist/live-monitor-downloader/project/volumes/downloaded/.gitkeep

# curl  http://192.168.10.21:60901/hello_ul
# curl -X POST -H "Content-Type: application/json" -d "{\"url\":\"https://www.youtube.com/watch?v=hD6gn4PEHK8\"}" http://192.168.10.21:60901/yt_dl
# timeout 1
# curl -X POST -H "Content-Type: application/json" -d "{\"url\":\"https://www.youtube.com/watch?v=LONmiFO5GgE\"}" http://192.168.10.21:60901/yt_dl
# timeout 1
# curl -X POST -H "Content-Type: application/json" -d "{\"url\":\"https://www.youtube.com/watch?v=6pH3Uma8LlY\"}" http://192.168.10.21:60901/yt_dl
# curl http://192.168.10.21:60901/yt_upload

# # yt_uploader
curl -H "Content-Type: application/json" -X POST -d "{\"path\":\"/volumes/downloaded/gvnaf/最後一急 [k9PyUA_sLGk].mkv\",\"title\":\"最後一急 [k9PyUA_sLGk].mkv\",\"description\":\"最後一急 [k9PyUA_sLGk].mkv\"}" http://localhost:3011/yt_ul
# # curl http://localhost:3011/helloworld
