//config\facebookConfig.js

const dotenv = require('dotenv');
dotenv.config();

const facebookConfig = {
  development: {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
    CALLBACK_URL: 'http://127.0.0.1:3001/api/auth/facebook/callback'
  },
  production: {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
    CALLBACK_URL: 'https://your-production-url.com/api/auth/facebook/callback'
  }
};

module.exports = facebookConfig[process.env.NODE_ENV] || facebookConfig.development;