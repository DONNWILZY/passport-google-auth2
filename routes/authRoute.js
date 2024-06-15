const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../config/googleauth');
require('../config/facebookAuth');
const { generateAuthToken } = require('../utitilties/jwtUtils');

// Default route for testing
router.get('/login', (req, res) => {
  res.send(`
    <a href="/api/auth/google">Auth with Google</a> </br>
    <a href="/api/auth/facebook">Auth with Facebook</a>
  `);
});

const loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/auth/locked',
    failureRedirect: '/login',
  })
);

// Facebook Authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/auth/locked',
    failureRedirect: '/api/auth/login'
  })
);

// Locked route (only accessible if logged in)
router.get('/locked', loggedIn, (req, res) => {
  res.send(`Hello authenticated user!`);
});

module.exports = router;
