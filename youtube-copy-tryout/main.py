import os,sys
from pprint import pprint
from fabric.api import lcd, local, settings
import tempfile


def checkMediaDownloaded():
  result_mkv = local('ls *.mkv || true', capture=True)

  result_mp4 = local('ls *.mp4 || true', capture=True)
  print(len(result_mkv))
  print(len(result_mp4))

  if len(result_mkv) > 0:
    # downloaded as mkv
    return result_mkv

  elif len(result_mp4)> 0:
    return result_mp4

  else:
    print('no downloaded file found')
    return False


def performDownload(youtube_link):
  try:
    result = local("youtube-dl -f 'bestvideo[height<=1920]+bestaudio/best[height<=1920]' -o 'temp' '{}'".format(youtube_link), capture=True)
    print(result)

  except Exception as e:
    raise e

def performUpload(file_to_upload):
  try:
    result = local('pipenv run youtube-upload --title="upload-from-youtube-ul-test" {}'.format(file_to_upload), capture=True)

  except Exception as e:
    raise e


def youtubeDownload(yt_link):
  retry_download = True
  retry_countdown = 3

  while retry_download:
    try:
      performDownload(yt_link)
      media_download_result = checkMediaDownloaded()

      if media_download_result:
        retry_download = False
        return media_download_result
      else:
        if retry_countdown > 0:
          retry_countdown-=1

        else:
          # download not success, retry count used up
          retry_download = False
          return False
    except Exception as e:
      raise e


def youtubeUpload(file_to_upload):
  performUpload(file_to_upload)

def checkNewMkvMp4():
  pass

def main():
  links=[
    'https://www.youtube.com/watch?v=7k_E5xaOoAs'
  ]
  for yt_link in links:
    download_result = youtubeDownload(yt_link)
    if download_result:
      youtubeUpload(download_result)

if '__main__'==__name__:
  main()
  # print('helloworld')
