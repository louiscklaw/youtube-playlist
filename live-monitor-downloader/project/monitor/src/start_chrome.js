const { initBrowser } = require('./utils/initBrowser');

console.log('start chrome js');

(async () => {
  try {
    start_dir = '/home/logic/share/chrome-user-data/vba_hk_help';

    const browser = await initBrowser({ chrome_data_dir: start_dir });

    const page = (await browser.pages())[0];

    await page.waitForTimeout(9999 * 1000);
  } catch (error) {
    console.log(error);
  }
})();
