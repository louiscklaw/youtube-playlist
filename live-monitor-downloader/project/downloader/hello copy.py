import threading
import random
import os
import requests
import json

from flask import Flask
import flask
import subprocess

alphabet = "abcdefghijklmnopqrstuvwxyz"

processed_link = []

app = Flask(__name__)

def download_video(url):
    try:
        subprocess.run(["yt-dlp", "-q",  "-N 10","-P /downloaded", url])
        url = "http://yt_uploader:3000/yt_up"
        data = {"path": "/volumes/downloaded/ABCDE/test.mp4","title":"hello_title","descriptin":"hello_description"}
        response = requests.post(url, json=data)
    except:
        pass

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/yt_dl", methods=["POST"])
def yt_dl():
    data = flask.request.get_json()
    url = data["url"]

    if url in processed_link:
        return "Already processed"
    else:
        random_alphabet = ''.join(random.sample(alphabet,5))

        dir_name = random_alphabet
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)

        # run in background
        processed_link.append(url)

        threading.Thread(target=download_video, args=(url,)).start()  # start a new thread

        return "spawned download command"

