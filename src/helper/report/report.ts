const report = require("multiple-cucumber-html-reporter");
report.generate({
    jsonDir: "test-results",
    reportPath: "./",
    reportName: "Playwright Automation Report",
    pageTitle: "Vonage CI/CD test report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome"
        },
        platform: {
            name: "Windows",
            version: "10",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Vonage CI/CD" }
        ],
    },
});