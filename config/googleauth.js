const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const dotenv = require('dotenv');
const User = require('../models/User');
const { generateAuthToken } = require('../utitilties/jwtUtils');
const { generateSystemNumber } = require('../utitilties/appId');
const { signupSuccessfulEmail } = require('../helpers/mailerHelpers');



dotenv.config();
const googleAuthConfig = require('./googleConfig');

passport.use(new GoogleStrategy({
  clientID: googleAuthConfig.GOOGLE_CLIENT_ID,
  clientSecret: googleAuthConfig.GOOGLE_CLIENT_SECRET,
  callbackURL: googleAuthConfig.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      // New user, save to database
      const newUser = new User({
        appId: generateSystemNumber(),
        googleId: profile.id,
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.email,
        avatar: profile.picture,
        isEmailVerified: profile.email_verified
      });

      await newUser.save();
      user = newUser;

      // Send confirmation email
      await signupSuccessfulEmail(user.email, user.name);
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    await user.save();

    const token = generateAuthToken(user);
    return done(null, { ...user.toObject(), token });
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
