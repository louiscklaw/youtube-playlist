FROM python:3-slim-buster

RUN apt update
RUN apt install ffmpeg -y


WORKDIR /app

COPY . .

RUN python3 -m pip install pipenv

RUN pipenv sync

RUN chown 1000:1000 -R /app

RUN mkdir /.local
RUN chown 1000:1000 -R /.local

RUN mkdir /.cache
RUN chown 1000:1000 -R /.cache

RUN chown 1000:1000 -R /root

# TODO: migrate to upper place after confirm useful
RUN apt install curl wget -qqy

USER 1000

CMD ["./entry.sh"]
