from flask import Flask
import flask

processed_link = []

app = Flask(__name__)

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

        processed_link.append(url)
        # spawn a command "yt-dlp" to download the url
        import subprocess
        subprocess.Popen(["yt-dlp", "-q",  "-N 10","-P /downloaded", url],
                        start_new_session=True)  # run in background
        return "spawned download command"

