const User = require("../../models/User");

module.exports = async (email, displayName, done) => {
  if (!email) {
    return done(null, false, 'Email not specified');
  }

  try {
    let user = await User.findOne({email});

    if (user) {
      return done(null, user);
    }

    user = await User.create({email, displayName});

    return done(null, user);
  }
  catch (err) {
    done(err);
  }
};
