const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure User model is imported

require('../config/googleauth');
require('../config/facebookAuth');

const { generateAuthToken } = require('../utitilties/jwtUtils');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SEC_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
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
  const user = req.user;
  const token = user.token;
  const responseData = {
    appId: user.appId,
    googleId: user.googleId,
    name: user.name,
    email: user.email,
    phone: user.phone,
    authToken: token
  };

  console.log('Success:', responseData);
  res.status(200).json(responseData);
});

// Facebook Authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/api/auth/login' }), (req, res) => {
  const user = req.user;
  const token = user.token;
  const responseData = {
    appId: user.appId,
    facebookId: user.facebookId,
    name: user.name,
    email: user.email,
    phone: user.phone,
    authToken: token
  };

  console.log('Success:', responseData);
  res.status(200).json(responseData);
});

// Route to receive and display the token
router.get('/success', (req, res) => {
  const token = req.query.token;

  jwt.verify(token, process.env.JWT_SEC_KEY, async (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });

    try {
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ error: 'User not found.' });

      const responseData = {
        appId: user.appId,
        googleId: user.googleId,
        facebookId: user.facebookId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        authToken: token
      };

      console.log('Success:', responseData);
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving user data.' });
    }
  });
});

// Locked route (only accessible if JWT is valid)
router.get('/locked', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const responseData = {
      appId: user.appId,
      googleId: user.googleId,
      facebookId: user.facebookId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      authToken: req.headers['authorization']
    };

    console.log('Authenticated user:', responseData);
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user data.' });
  }
});

module.exports = router;
