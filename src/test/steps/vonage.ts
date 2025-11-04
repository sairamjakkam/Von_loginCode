import { Given, When, Then, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
//import { expect } from "@playwright/test";
import { test, expect } from '@playwright/test';
import * as data from "../../data/test-data.json";
import { pageFixture } from "../../hooks/pageFixture";
import vonageLoginPage from "../pages/vonageLoginPage";


Given('I am on the login page', async function () {
    console.log("Navigating to login page");
});

When('I enter my username and password', async function () {
    await pageFixture.page.fill(vonageLoginPage.locators.usernameInput, data.credentials.username);
    await pageFixture.page.fill(vonageLoginPage.locators.passwordInput, data.credentials.password);
});

When('I click the login button', async function () {
    await pageFixture.page.click(vonageLoginPage.locators.loginButton);
});

Then('I should be redirected to two factor authentication page', async function () {
    await pageFixture.page.waitForSelector("//h1[@id='dashboard-my-apps-title']", { timeout: 90000 });
    const context = pageFixture.page.context();
    await context.storageState({ path: 'cookies.json' });
    console.log('Saved authenticated session to cookies.json');
});

Then('I should be logged in successfully', async function () {
    await expect(pageFixture.page.locator("//h1[@id='dashboard-my-apps-title']")).toBeVisible();
    console.log("Login successful with valid credentials");
});

