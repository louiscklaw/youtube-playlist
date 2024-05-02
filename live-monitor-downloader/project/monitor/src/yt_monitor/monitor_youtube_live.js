const { initBrowser } = require('../utils/initBrowser');
const fetch = require('node-fetch');

let yt_monitor_data_dir = '/home/logic/share/chrome-user-data/yt_monitor';

let monitor_list = [
  'https://www.youtube.com/@EggEggClubNewsChannel/streams',
  'https://www.youtube.com/@ChannelCHK/streams',
];

console.log('start chrome js');

(async () => {
  let browser;

  try {
    browser = await initBrowser({ chrome_data_dir: yt_monitor_data_dir });
    const page = (await browser.pages())[0];

    for (let i = 0; i < monitor_list.length; i++) {
      let url = monitor_list[i];
      for (let j = 0; j < 3; j++) {
        try {
          await page.goto(url);
          await page.waitForTimeout(3 * 1000);
          break;
        } catch (error) {
          console.log('error during getting to the page');
          await page.waitForTimeout(3 * 1000);
        }
      }

      const live_links = await page.evaluate(() => {
        try {
          let test = [];
          let links = [];

          Array.from(document.querySelectorAll('a')).forEach(el_a => {
            el_a.querySelectorAll('span').forEach(el_span => {
              if (el_span.textContent.search('LIVE') != -1) {
                test.push(el_a.pathname + el_a.search);
              }
            });
          });

          links = [...new Set(test)];
          return JSON.stringify(links);
        } catch (error) {
          return JSON.stringify([]);
        }
      });

      let links = JSON.parse(live_links);

      for (let i = 0; i < links.length; i++) {
        let url = links[i];
        let yt_download_url = `https://www.youtube.com` + url;
        console.log(yt_download_url);

        for (let j = 0; j < 3; j++) {
          try {
            const response = await fetch('http://downloader:5000/yt_dl', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url: yt_download_url }),
            });

            const responseBody = await response.text();
            console.log(responseBody);
            console.log('download request sent');

            break;
          } catch (error) {
            console.log(error);
            console.log('error during requesting download');
          }
        }
      }

      await page.waitForTimeout(1 * 1000);
    }

    await browser.close();
  } catch (error) {
    console.log(error);
    browser ? await browser.close() : null;
  }
})();
