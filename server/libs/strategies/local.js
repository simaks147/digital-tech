const LocalStrategy = require('passport-local');
const User = require('../../models/User');

module.exports = new LocalStrategy({
  usernameField: 'email',
  session: false
}, async (email, password, done) => {
  try {
    const user = await User.findOne({email});

    if (!user) {
      return done(null, null, 'No such user');
    }

    if (!user.passwordHash) {
      return done(null, null, 'No password set for user, login with social network');
    }

    if (!await user.checkPassword(password)) {
      return done(null, null, 'Incorrect password');
    }

    return done(null, user);
  }
  catch (err) {
    done(err);
  }
});
