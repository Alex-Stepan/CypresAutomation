const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practice.cydeo.com/',
    video: false,
    retries: 2, //how many times it will retry to reproduce
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
