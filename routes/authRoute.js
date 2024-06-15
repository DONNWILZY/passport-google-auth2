const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/googleauth');


// deault route for testing
router.get('/login', (req, res) => {
    res.send(
        '<a href="/google">Auth with Google</a> </br>' +
        '<a href="/api/facebook">Auth with Facebook</a>'
    );
});

const loggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/locked',
        failureRedirect: '/login'
    })
);

// Facebook Authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'profile'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to homepage
        res.redirect('/');
    }
);

// Locked route (only accessible if logged in)
router.get('/locked', loggedIn, (req, res) => {
    console.log(`Logged in successfully`);
    res.send(`Hello authenticated user!`);
});

module.exports = router;