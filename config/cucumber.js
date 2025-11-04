module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "",
        use: {
            viewport: { width: 1920, height: 1080 }, // Full HD screen size
          },
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/test/feature/"
        ],
        dryRun: false,
        require: [
            "src/test/steps/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        workers: 1,
        parallel: 1
    }
}