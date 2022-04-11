const LocalStrategy = require("passport-local");
const bcryptjs = require("bcryptjs");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = // getUserByEmail(email); 
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }
    try {
      if (await bcryptjs.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: "Password incorrect" });
    } catch (err) {
      return done(err);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }), authenticateUser);
  passport.serializeUser((id, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    done(err, user.id);
  });
}

module.exports = { initialize };
