FROM python:3-slim-buster

RUN apt update
RUN apt install ffmpeg -y

WORKDIR /app

COPY . .

RUN python3 -m pip install pipenv

RUN pipenv sync

CMD ["./entry.sh"]
