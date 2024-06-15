

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookConfig = require('./facebookConfig');

passport.use(new FacebookStrategy({
  clientID: facebookConfig.FACEBOOK_APP_ID,
  clientSecret: facebookConfig.FACEBOOK_APP_SECRET,
  callbackURL: facebookConfig.CALLBACK_URL,
  profileFields: ['id', 'emails', 'name', 'picture.type(large)']
}, (accessToken, refreshToken, profile, cb) => {
  // Authenticate user without connecting to DB
  cb(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  done(null, { _id: id });
});