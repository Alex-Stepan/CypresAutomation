const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practice.cydeo.com/',
    video: false, //do not recored video
    retries: 1, //how many times it will retry to reproduce
    defaultCommandTimeout: 5000,  //waiting timeout (by default is 4sec=4000msec)
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
