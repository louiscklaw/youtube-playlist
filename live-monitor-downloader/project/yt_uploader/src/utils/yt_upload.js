const { upload } = require('youtube-videos-uploader'); //vanilla javascript
const { sendDiscordMessage } = require('./sendDiscordMessage');
const fs = require('fs');

// const video2 = {
//   path: 'video2.mp4',
//   title: 'title 2',
//   description: 'description 2',
//   thumbnail: 'thumbnail.png',
//   language: 'english',
//   tags: ['video', 'github'],
//   playlist: 'playlist name',
//   channelName: 'Channel Name',
//   onSuccess: onVideoUploadSuccess,
//   skipProcessingWait: true,
//   onProgress: progress => {
//     console.log('progress', progress);
//   },
//   uploadAsDraft: false,
//   isAgeRestriction: false,
//   isNotForKid: false,
//   publishType: 'PUBLIC',
//   isChannelMonetized: false,
// };

async function removeMediaPath({ path }) {
  // delete the file
  try {
    const baseName = path.basename(path);

    await fs.rm(baseName, { force: true, recursive: true });
    await fs.rm(path, { force: true, recursive: true });

    await sendDiscordMessage({ webhookPayload: { username: 'yt_uploader', content: `yt_ul deleted: ${path}` } });
  } catch (error) {
    await sendDiscordMessage({
      webhookPayload: { username: 'yt_uploader', content: `yt_ul failed to delete ${path}` },
    });
    console.log('failed to delete', error);
  }
}

process.on('message', async msg => {
  let { path, title, description } = msg;

  try {
    console.log('Message from parent:', msg);

    // recoveryemail is optional, only required to bypass login with recovery email if prompted for confirmation
    const credentials = { email: 'testhelloworld04@gmail.com', pass: '24p69gki', recoveryemail: 'logickee@gmail.com' };

    // minimum required options to upload video
    const video1 = { path, title, description };

    // This package uses Puppeteer, you can also pass Puppeteer launch configuration
    await upload(credentials, [video1], { headless: false });

    await sendDiscordMessage({ webhookPayload: { username: 'yt_uploader', content: `yt_ul upload done: ${path}` } });

    await removeMediaPath({ path });

    try {
      await fetch('http://healthcheck.iamon99.com/ping/b57019a1-d5f2-444c-b85e-0552970427dc');
    } catch (error) {
      console.log('error during sending ping');
    }

    console.log('hello upload done');
  } catch (error) {
    await sendDiscordMessage({ webhookPayload: { username: 'yt_uploader', content: `yt_ul error found: ${path}` } });
    console.log('upload error found');
  }
});
