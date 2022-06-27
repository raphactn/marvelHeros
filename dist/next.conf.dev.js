"use strict";

require('dotenv').config();

module.exports = {
  env: {
    APP_URL: process.env.APP_URL,
    APP_PUBLIC_KEY: process.env.APP_PUBLIC_KEY,
    APP_PRIVATE_KEY: process.env.APP_PRIVATE_KEY
  }
};