require('dotenv').config();
const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const sessionPool = require('pg').Pool
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
const app = express();
const port = process.env.PORT || 3001;
const DEBUG_MODE = process.env.DEBUG_MODE || true;

const sessionDBaccess = new sessionPool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres'
})

app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new pgSession({
    pool: sessionDBaccess,
    tableName: 'session'
  })
}));

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: [ 'profile' ]
}, function(issuer, profile, cb) {
  return cb(null, {});
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    if (DEBUG_MODE) {
      console.log("user to be serialized", user);
    }
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    if (DEBUG_MODE) {
      console.log("user to be deserialized", user);
    }
    return cb(null, user);
  });
});

app.use(express.static(path.join(__dirname, '../..', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'build', 'index.html'));
})

app.get('/login/federated/google', passport.authenticate('google'));

app.get('/oauth2/redirect/google', passport.authenticate('google',  {
  failureRedirect: '/',
  failureMessage: true
}), function(req, res) {
  if (DEBUG_MODE) {
    console.log('Google OAuth response:', res.statusCode);
  }
  res.redirect('/');
});

app.post('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
