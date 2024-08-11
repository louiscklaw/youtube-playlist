import threading
import random
import os
import requests
import json
import datetime

from flask import Flask
import flask
import subprocess

DISCORD_WEBHOOK_URL = os.getenv('DISCORD_WEBHOOK_URL','')

alphabet = "abcdefghijklmnopqrstuvwxyz"

processed_link = []

app = Flask(__name__)

def download_video(params ):
    try:
        url = params[0]
        dir_path = params[1]

        subprocess.run(["yt-dlp", "-q", "-N 5", "-S vcodec:vp9,res,acodec:m4a", "-P " + dir_path, url])
        yt_upload(dir_path)

        requests.post(DISCORD_WEBHOOK_URL, json={ "content": "download done:"  + dir_path })

        print("done")

    except Exception as e:
        print(e)

@app.route("/yt_upload")
def yt_upload(path="/volumes/downloaded/mtocg"):
    media_files = []
    try:
        for root, dirs, files in os.walk(path):
            for file in files:
                if file.endswith(".mp4") or file.endswith(".webm") or file.endswith(".mkv"):
                    media_file_name = os.path.join(root, file)
                    media_files.append([os.path.join(root, file), media_file_name])

        for [path, filename] in media_files:
            print("upload: " + path)
            url = "http://yt_uploader:3000/yt_ul"

            now = datetime.datetime.now()
            data = {"path": path,
                    "title": os.path.basename(filename),
                    "description": now.strftime("%Y-%m-%d %H:%M:%S")}
            response = requests.post(url, json=data)
    except Exception as e:
        print(e)

    return "done"

@app.route("/yt_dl", methods=["POST"])
def yt_dl():
    try:
        data = flask.request.get_json()
        url = data["url"]

        if url in processed_link:
            return "Already processed"
        else:
            random_alphabet = ''.join(random.sample(alphabet,5))
            requests.post(DISCORD_WEBHOOK_URL, json={ "content": "downloader: start url " + url +"," + "dir:" + random_alphabet })

            dir_name = random_alphabet
            dir_path = os.path.join("/volumes", "downloaded", dir_name)
            if not os.path.exists(dir_path):
                os.makedirs(dir_path)

            # run in background
            processed_link.append(url)
            print("download requested")
            print(dir_path)

            threading.Thread(target=download_video, args=([url, dir_path],)).start()  # start a new thread

            return "spawned download command: " + dir_path

    except Exception as e:
        print(e)

@app.route("/helloworld")
def hello_world():
    return "<p>Hello, World!</p>"

requests.post(DISCORD_WEBHOOK_URL, json={ "content": "downloader: started" })
