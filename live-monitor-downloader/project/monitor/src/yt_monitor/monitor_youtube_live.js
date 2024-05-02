const { initBrowser } = require('../utils/initBrowser');
const fetch = require('node-fetch');

let yt_monitor_data_dir = '/home/logic/share/chrome-user-data/yt_monitor';

console.log('start chrome js');

(async () => {
  let browser;
  try {
    browser = await initBrowser({ chrome_data_dir: yt_monitor_data_dir });
    const page = (await browser.pages())[0];
    await page.goto('http://192.168.10.89:8080/example-html/');

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

    // const posts = await page.$$('h1');

    // // Extract the text content of the selected element
    // await posts.forEach(async post => {
    //   const textContent = await post.evaluate(element => element.textContent, posts);
    //   if (textContent.toLowerCase().indexOf('louis_coding') != -1) {
    //     if (textContent.toLowerCase().indexOf('spotlight') > -1) {
    //       await post.click({ button: 'right' });
    //       await page.waitForNavigation({
    //         timeout: 30 * 1000,
    //         waitUntil: 'networkidle0',
    //       });
    //     }
    //   }
    // });

    // wait for search result
    // await page.waitForTimeout(5 * 1000);
    // input box
    // #root > div > div > header > div.D_Qx.M_Gx > div > div > div > div.D_arY > div > div > div > input

    // console.log("start count");
    // const elements = await page.locator("body").count();

    // console.log({ elements });
    // await elements.forEach(async (ele) => {
    //   console.log(ele.textContent());
    // });

    // await page.evaluate(() => {
    //   let posts = document.querySelectorAll("");

    //   posts.forEach((post) => {
    //     let text_content = post.textContent.toLowerCase();
    //     // skip if found
    //     if (text_content.indexOf("louiscklaw") == -1) {
    //       if (text_content.indexOf("spotlight") > -1) {
    //         post.click();
    //       }
    //     }
    //   });
    // });

    await page.waitForTimeout(1 * 1000);

    await browser.close();
  } catch (error) {
    console.log(error);
    browser ? await browser.close() : null;
  }
})();
