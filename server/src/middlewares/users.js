const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN_KEY;

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(new Error("your are not authenticated!"));
  jwt.verify(token, SECRET_TOKEN_KEY, (err, infos) => {
    if (err) return next(new Error("token is not valid!"));
    req.user = infos;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      next(new Error("you are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(new Error("you are not the admin!"));
    }
  });
};
module.exports = { verifyUser, verifyAdmin };
