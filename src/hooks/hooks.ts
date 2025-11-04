import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { chromium,Browser, Page, BrowserContext } from "@playwright/test";
import {pageFixture} from "./pageFixture";
import { invokeBrowser } from "../helper/browser/browserManager";
import { getEnv } from "../helper/env/env";
import * as fs from 'fs';

import { setDefaultTimeout } from "@cucumber/cucumber";

// Set timeout to 60 seconds (or more if needed)
setDefaultTimeout(60 * 1000);


let browser: Browser;
let context: BrowserContext;

BeforeAll(async function() {
    getEnv();
    browser = await invokeBrowser(); // Ensure invokeBrowser() is correctly implemented
    if (!browser) {
        browser = await chromium.launch({ headless: false , args: ['--start-maximized'] });
    }
})

// async function loadCookiesFromFile(context, filePath) {
//     const cookies = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
//     await context.addCookies(cookies);
// }

async function loadCookiesFromFile(context: BrowserContext, filePath: string) {
  if (fs.existsSync(filePath)) {
    try {
      const cookiesData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      // ✅ Handle both shapes — array or wrapped object
      const cookies = Array.isArray(cookiesData)
        ? cookiesData
        : cookiesData.cookies;

      if (Array.isArray(cookies)) {
        await context.addCookies(cookies);
        console.log("Cookies loaded successfully.");
      } else {
        console.warn("Invalid cookies.json format — skipping cookie load.");
      }
    } catch (err) {
      console.warn("Could not parse cookies.json. Continuing without cookies.", err);
    }
  } else {
    console.log("No cookies.json found. Proceeding without cookies.");
  }
}

Before(async function () {
    context = await browser.newContext();
    pageFixture.page = await context.newPage();
    await pageFixture.page.goto(`${process.env.BASEURL}`);
    await pageFixture.page.waitForTimeout(3000);
    await loadCookiesFromFile(context, 'cookies.json');

    // Attach page & context to Cucumber's `this` so steps can use them
    this.page = pageFixture.page;
    this.context = context;
});

After(async function ({ pickle, result }) {
    //screenshot
    try{
        if (result?.status == Status.FAILED) {    
        const img = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
        this.attach(img, "image/png");        
        }  
        await pageFixture.page.close();
        await context.close();
    } catch (error) {
        console.error("Error closing context/page:", error);
    }
})

AfterAll(async function () {
    if (browser) {
        await browser.close();
    }
})
