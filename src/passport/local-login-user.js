var jwt = require('jsonwebtoken');
var Strategy = require('passport-local').Strategy;
var userCtrl = require('../controllers/user-ctrl');

module.exports = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  function(req, username, password, done) {
    var userData = {
      username: username.trim(),
      password: password.trim()
    };

    return userCtrl.findUserByUsername(userData.username)
      .then(function(user) {
        if (!user) {
          var error = new Error('Incorrect username or password');
          error.name = 'IncorrectCredentialsError';

          return done(error);
        }

        return user.comparePassword(userData.password).then(function(isMatch) {
          if (!isMatch) {
            var err = new Error('Incorrect username or password');
            err.name = 'IncorrectCredentialsError';

            return done(err);
          }

          var payload = {
            sub: user.id,
            user: user.username,
            role: 'user',
            zipcode: user.zipcode
          };

          var token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
          });

          return done(null, token);
        });
      })
      .catch(function(err) {
        return done(err);
      });
  }
);
