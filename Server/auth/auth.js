const { findUserById, findUserByUsername } = require('../prisma/query')
const passport = require('passport')
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;


//Used for authenticating a user's inputted username and password
const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await findUserByUsername(username);
    const match = await bcrypt.compare(password, user.password);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    if (!match) {
      // passwords do not match!
      return done(null, false, { message: "Incorrect password" })
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.use(strategy);