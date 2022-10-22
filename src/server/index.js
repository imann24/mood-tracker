console.log('[debug]', 'start 1')
require('dotenv').config();
const path = require('path');
const express = require('express');
console.log('[debug]', 'start 2')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
console.log('[debug]', 'start 3')
const pg = require('pg');
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres'
};

const run = async () => {
  const db = new pg.Client(dbConfig);
  db.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  console.log('[debug]', 'start alpha')
  // await db.query("CREATE TABLE IF NOT EXISTS session (sid varchar(255) NOT NULL COLLATE default, sess json NOT NULL, expire timestamp(6) NOT NULL) WITH (OIDS=FALSE); ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;")
  db.query("CREATE TABLE IF NOT EXISTS session (sid varchar(255) NOT NULL, sess json NOT NULL, expire timestamp(6) NOT NULL)")
  console.log('[debug]', 'start beta')
  await db.query("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BYTEA, \
    salt BYTEA, \
    name TEXT \
  )");
  console.log('[debug]', 'start gamma')
  await db.query("CREATE TABLE IF NOT EXISTS federated_credentials ( \
    id INTEGER PRIMARY KEY, \
    user_id INTEGER NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL, \
    UNIQUE (provider, subject) \
  )");
  console.log('[debug]', 'start 4')
  // await db.query('select * from postgres.session').then((result) => {
  //   console.log(result)
  // })
  console.log('[debug]', 'start 5')
  const sessionPool = pg.Pool;
  const sessionDBaccess = new sessionPool(dbConfig);
  const session = require('express-session')
  console.log('[debug]', 'start 6')
  const pgSession = require('connect-pg-simple')(session)
  console.log('[debug]', 'start 7')
  const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
  const app = express();
  const port = process.env.PORT || 3001;
  const DEBUG_MODE = process.env.DEBUG_MODE || true;

  app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new pgSession({
      pool: sessionDBaccess,
      tableName: 'session'
    })
  }));

  console.log('[debug]', 'start 8')

  passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile' ]
  }, function verify(issuer, profile, cb) {
    db.query('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      issuer,
      profile.id
    ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) {
        db.query('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }

          var id = this.lastID;
          db.query('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            issuer,
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            var user = {
              id: id,
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        db.query('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
          if (err) { return cb(err); }
          if (!row) { return cb(null, false); }
          return cb(null, row);
        });
      }
    });
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
}

run()
