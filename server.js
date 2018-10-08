const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const CONFIG = require('./config.json');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require('./db/models/Users.js');
const authRoutes = require('./routes/authRoutes.js');
const mainRoutes = require('./routes/mainRoutes.js');
const PORT = 3000;

// Extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Sets express-handlebars view engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Sets up sessions with Redis
app.use(
  session({
    store: new redisStore({ logErrors: true }),
    secret: CONFIG.SECRET_SESSION,
    resave: false,
    saveUninitialized: true
  })
);

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, done) => {
      Users.where({ email })
        .fetch()
        .then(user => {
          bcrypt
            .compare(password, user.attributes.password)
            .then(res => {
              if (res) {
                done(null, user);
              } else {
                done(null, false);
              }
            })
            .catch(err => {
              console.log('err', err);
            });
        })
        .catch(err => {
          console.log('err', err);
          done(err);
        });
    }
  )
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, done) => {
  console.log('serializing user', user);
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  console.log('deserialize user', user);
  done(null, user);
});

app.use('/auth', authRoutes);
app.use('/', mainRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
