const puppeteer = require('puppeteer');

const runTest = async (extPath) => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            `--disable-extensions-except=${extPath}`,
            `--load-extension=${extPath}`,
        ],
    });

    const page = await browser.newPage();
    await page.goto('http://example.com');

    const start = Date.now();
    await browser.close();

    return Date.now() - start;
};

(async () => {
    console.log('When requireInteraction === false, browser closes in:', await runTest('./ext-interaction-not-required'));
    console.log('When requireInteraction === true, browser closes in:', await runTest('./ext-interaction-required'));
})();