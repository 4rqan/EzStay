const jwt = require("jsonwebtoken");
const adminRequireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send("You must be logged in");

  var token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).send("You must be logged in");
    else if (payload.role !== "Admin")
      res.status(401).send("You don't have permission to access this api");
    req.user = payload;
    next();
  });
};

module.exports = adminRequireAuth;
