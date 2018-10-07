const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const CONFIG = require('./config.json');
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

app.use('/auth', authRoutes);
app.use('/', mainRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
