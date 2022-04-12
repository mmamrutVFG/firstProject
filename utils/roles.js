const rolAuthenticator = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(401).send("Not allowed to access");
  }
  return next();
};

module.exports = { rolAuthenticator };
