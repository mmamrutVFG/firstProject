const passport = require("passport");
const passportJwt = require("passport-jwt");

const { ExtractJwt, Strategy } = passportJwt;
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      const user = {
        // Elijo la información que quiero sacar del token para usar en el front
        id: jwtPayload.id,
        email: jwtPayload.email,
        role: jwtPayload.role,
      };
      done(null, user); // La información que saco del toquen queda guardada en req.user (de la función que llamó al middleware)
    }
  )
);

module.exports = {};
