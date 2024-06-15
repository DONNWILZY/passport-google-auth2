//config\googleAuth.js

const passport = require('passport');
const dotenv = require('dotenv');
const url = require('url');
dotenv.config();
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const googleAuthConfig = require('./googleConfig');

passport.use(new GoogleStrategy({
  clientID: googleAuthConfig.GOOGLE_CLIENT_ID,
  clientSecret: googleAuthConfig.GOOGLE_CLIENT_SECRET,
  callbackURL: googleAuthConfig.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done){
    done(null,user)
});

passport.deserializeUser(function(user, done){
    done(null,user)
});
