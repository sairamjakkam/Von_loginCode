import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import { create } from "domain";
class VonageLoginPage {
    locators = {
        usernameInput: "//input[@id='input28']",
        passwordInput: "//input[@id='input36']",
        loginButton: "//input[@class='button button-primary']",
        //twoFactorInput: "//*[@id='okta-verify-input']",
    };
}
const vonageLoginPage = new VonageLoginPage();
export default vonageLoginPage;