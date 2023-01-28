const jwt = require("jsonwebtoken");
const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send("You must be logged in");

  var token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).send("You must be logged in");
    req.user = payload;
    next();
  });
};

module.exports = requireAuth;
