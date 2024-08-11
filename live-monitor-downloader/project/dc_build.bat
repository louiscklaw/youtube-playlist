@REM docker compose build downloader
@REM docker compose run -it monitor bash

docker compose up -d
docker compose logs -f

@REM docker compose run -it downloader bash