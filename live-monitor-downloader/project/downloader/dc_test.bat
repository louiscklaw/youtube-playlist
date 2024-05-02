docker build . -t python-test

@REM docker run -p 5000:5000 -v %cd%:/app -v %cd%/../volumes/downloaded:/downloaded -it python-test bash
