const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Ensure Google and Facebook strategies are configured
require('../config/googleAuth');
require('../config/facebookAuth');

// Utility to generate JWT token
const generateAuthToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SEC_KEY, { expiresIn: '1d' });
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Access denied.');

  jwt.verify(token, process.env.JWT_SEC_KEY, (err, decoded) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = decoded;
    next();
  });
};

// Default route for testing
router.get('/login', (req, res) => {
  res.send(`
    <a href="/api/auth/google">Auth with Google</a> </br>
    <a href="/api/auth/facebook">Auth with Facebook</a>
  `);
});

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/auth/login' }), (req, res) => {
  // Generate and send JWT token
  const token = generateAuthToken(req.user);
  res.redirect(`/api/auth/success?token=${token}`);
});

// Facebook Authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/api/auth/login' }), (req, res) => {
  // Generate and send JWT token
  const token = generateAuthToken(req.user);
  res.redirect(`/api/auth/success?token=${token}`);
});

// Route to receive and display the token
router.get('/success', (req, res) => {
  const token = req.query.token;
  res.send(`JWT Token: ${token}`);
});

// Locked route (only accessible if JWT is valid)
router.get('/locked', verifyToken, (req, res) => {
  res.send(`Hello authenticated user!`);
});

module.exports = router;
