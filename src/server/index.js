require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: [ 'profile' ]
}, function(issuer, profile, cb) {
  return cb(null, {});
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/login', function(req, res, next) {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
