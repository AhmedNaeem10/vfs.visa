const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')

async function main(){
    puppeteer.use(
        RecaptchaPlugin({
          provider: {
            id: '2captcha',
            token: 'cb0cc27dad9a3fe2c8794a5c0d31c4c3'
          },
          visualFeedback: true
        })
    );
    const url = "https://visa.vfsglobal.com/are/en/ita/login";
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: []
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url, {
        waitUntil: "networkidle0"
    });
    await page.waitForSelector('input[placeholder="jane.doe@email.com"]');
    await page.waitForTimeout(10000);
    await page.solveRecaptchas();
    await page.type('input[placeholder="jane.doe@email.com"]', "ahmednaeem.career@gmail.com", {delay: 100});
    await page.type('input[placeholder="**********"]', "9026040aN!", {delay: 100});
    let buttons = await page.$$('button')
    await buttons[1].click();
    await page.waitForTimeout(3000);
    await page.waitForNetworkIdle(0);
    await page.waitForSelector('span[class="mat-button-wrapper"]')
    await page.evaluate(()=>{
        let span = document.querySelector('span[class="mat-button-wrapper"]');
        span.click();
    })
    // await page.waitForSelector('div[id="mat-select-value-1"]');
    // await page.click('div[id="mat-select-value-1"]');
    // await page.waitForSelector('span[class="mat-option-text"]');
    // span = await page.$('span[class="mat-option-text"]');
    // await span.click();
    // await page.waitForTimeout(3000);
    // await page.click('div[id="mat-select-value-3"]');
    // span = await page.$('span[class="mat-option-text"]');
    // await span.click();
    // await page.waitForTimeout(3000);
    // await page.click('div[id="mat-select-value-5"]');
    // span = await page.$('span[class="mat-option-text"]');
    // await span.click();
    // let date = await page.evaluate(()=>{
    //     let div = document.querySelector('div[class="alert alert-info border-0 rounded-0"]')
    //     return div.textContent;
    // })
    // console.log(date);
}

main();