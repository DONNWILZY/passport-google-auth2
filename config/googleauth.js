//config\googleAuth.js
const passport = require('passport');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

dotenv.config();
const googleAuthConfig = require('./googleConfig');

passport.use(new GoogleStrategy({
  clientID: googleAuthConfig.GOOGLE_CLIENT_ID,
  clientSecret: googleAuthConfig.GOOGLE_CLIENT_SECRET,
  callbackURL: googleAuthConfig.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
