const express = require('express');
const router = express.Router();
const Users = require('../db/models/Users.js');
const passport = require('passport');

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  Users.forge({ email, password })
    .save()
    .then(result => {
      if (result) {
        res.redirect('/auth/protected');
      } else {
        res.send('fail');
      }
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
    /* No passport.js */

    //   const { email, password } = req.body;
    //   console.log('email', email);
    //   Users.where({ email })
    //     .fetch()
    //     .then(user => {
    //       if (user !== null && password === user.attributes.password) {
    //         req.session.isLoggedIn = true;
    //         res.send('Authorized');
    //       } else {
    //         res.send('Unauthorized');
    //       }
    //     })
    //     .catch(err => {
    //       console.log('err', err);
    //       res.send(err);
    //     });
  }
);

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('logged Out');
});

router.get('/protected', (req, res) => {
  if (req.session.isLoggedIn) {
    res.send('protected');
  } else {
    res.send('Not Authorized');
  }
});

module.exports = router;
