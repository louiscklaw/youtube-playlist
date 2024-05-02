FROM python:3-slim-buster

RUN apt update
RUN apt install ffmpeg -y


WORKDIR /app

COPY . .

RUN python3 -m pip install pipenv

RUN pipenv sync

RUN chown 1000:1000 -R /app
RUN chown 1000:1000 -R /root
RUN chown 1000:1000 -R /.local

USER 1000

CMD ["./entry.sh"]
