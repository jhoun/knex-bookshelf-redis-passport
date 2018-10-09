const express = require('express');
const router = express.Router();
const Users = require('../db/models/Users.js');
const passport = require('passport');
const bcrypt = require('bcrypt');
const CONFIG = require('../config.json');

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, CONFIG.SALT_ROUNDS).then(hashedPassword => {
    Users.forge({ email, password: hashedPassword })
      .save()
      .then(result => {
        if (result) {
          res.redirect('/auth/protected');
        } else {
          res.send('fail');
        }
      });
  });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/auth/protected',
    failureRedirect: '/'
  }),
  function(req, res) {
    console.log('req', req);
    res.send('authenticated');
  }
);

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('logged Out');
});

router.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('protected');
  } else {
    res.send('NOT ALLOWED');
  }
});

module.exports = router;
