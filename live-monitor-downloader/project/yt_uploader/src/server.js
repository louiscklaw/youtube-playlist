require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

const { fork } = require('child_process');
const { sendDiscordMessage } = require('./utils/sendDiscordMessage');
const forked = fork('./utils/yt_upload.js');
// forked.send({
//   path: '/volumes/downloaded/ABCDE/test.mp4',
//   title: 'title',
//   description: 'description',
// });

const { helloworld } = require('./utils/helloworld');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

sendDiscordMessage({ webhookPayload: { username: 'yt_uploader', content: `yt_uploader: started` } });

app.post('/yt_ul', async (req, res) => {
  try {
    let { path, title, description } = req.body;

    forked.send({ path, title, description });

    res.send('yt_ul request received');
  } catch (error) {
    res.send('yt_ul request error');
  }
});

app.get('/helloworld', (req, res) => {
  res.send('helloworld');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});
