//config\googleAuthEnv.js

const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV;

const googleAuthConfig = {
  development: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: 'http://127.0.0.1:3001/google/callback'
  },
  production: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: 'https://sotrip.vercel.app/google/callback'
  }
};

module.exports = googleAuthConfig[env] || googleAuthConfig.development;