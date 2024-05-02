const PocketBase = require("pocketbase/cjs");
const pb = new PocketBase("https://pocketbase.iamon99.com");

const { initBrowser } = require("../utils/initBrowser");
const _ = require("underscore");

const SCRIPT_FILENAME = "scrape_sell_post";
console.log("start chrome js");

let python_help_hk = "/home/logic/share/chrome-user-data/scrape_sell_post";

(async () => {
  let browser, page;
  let post_id,
    sell_post_price,
    sell_post_title,
    sell_post_description,
    sell_post_condition;

  try {
    browser = await initBrowser({ chrome_data_dir: python_help_hk });
    const page = (await browser.pages())[0];

    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (request.resourceType() === "image") {
        // console.log("Blocking image request: " + request.url());
        request.abort();
      } else {
        request.continue();
      }
    });

    const args = process.argv.slice(2);
    const start_id = args;

    for (i = 0; i < 999999; i++) {
      await page.waitForTimeout(2 * 1000);

      try {
        const post_id = start_id + i;

        let fetch_done = false;
        let check_not_available = 1;

        for (j = 0; j < 5; j++) {
          try {
            let url = "https://www.carousell.com.hk/p/p-" + post_id;
            console.log("fetching " + url);
            await page.goto(url);

            check_not_available = await page.evaluate(() => {
              return document
                .querySelector("body")
                ?.textContent?.search("not available");
            });

            fetch_done = true;
            break;
          } catch (error) {
            console.log("error");
            await page.waitForTimeout(10 * 1000);
          }
        }

        // skip and go next
        // cannot fetch page ?
        if (!fetch_done) continue;

        // item not available ?
        if (check_not_available > 0) continue;

        const sell_post_description = await page.evaluate(() => {
          return document.querySelector(
            "#FieldSetField-Container-field_description"
          )?.textContent;
        });

        const sell_post_price = await page.evaluate(() => {
          return document.querySelectorAll("input")[2]?.value || -1;
        });

        const sell_post_currency = await page.evaluate(() => {
          return (
            document
              .querySelector(
                '[data-testid="new-listing-details-page-desktop-div-seller-contact-box"]'
              )
              ?.querySelectorAll("span")[5]?.textContent || "not found"
          );
        });

        const sell_post_title = await page.evaluate(() => {
          return document.querySelector("h1")?.textContent;
        });

        const sell_post_condition = await page.evaluate(() => {
          return document.querySelectorAll(
            "#FieldSetField-Container-field_sticky_info div"
          )[1]?.textContent;
        });

        console.log({
          post_id,
          sell_post_price,
          sell_post_title,
          sell_post_description,
          sell_post_condition,
        });

        const data = {
          post_id,
          title: sell_post_title,
          price: sell_post_price,
          description: sell_post_description,
          condition: sell_post_condition,
          currency: sell_post_currency,
          status: "selling",
        };

        const record = await pb.collection("carousell_sell_posts").create(data);
      } catch (error) {
        console.log("error found during scraping post_id: ", post_id);
        console.log(error);
      }
    }
    console.log(`${SCRIPT_FILENAME}: script end with clear`);
  } catch (error) {
    console.log(error);
    // await page.waitForTimeout(9999 * 1000);
    await page.screenshot({
      path: "/home/logic/share/error_screenshot.png",
      fullPage: true,
    });
  }
  browser ? await browser.close() : null;
})();
