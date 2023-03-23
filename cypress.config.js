const { defineConfig } = require("cypress");
const mysql = require('cypress-mysql');

module.exports = defineConfig({
    viewportWidth: 1000,
    viewportHeight: 660,
    e2e: {
        setupNodeEvents(on, config) {
        mysql.configurePlugin(on);
      },
      testIsolation: false,
      "env": {
          "db": {
              "host": "192.168.1.19",
              "user": "rplace-username",
              "password": "replace-password",
              "database": "replace-database-name"
          }
      },
    },
});
