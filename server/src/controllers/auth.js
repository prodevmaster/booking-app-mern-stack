const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN_KEY;

const createToken = (id, isAdmin) => {
  const token = jwt.sign({ id, isAdmin }, SECRET_TOKEN_KEY);
  return token;
};
//register a user
const register = async (req, res, next) => {
  const body = req.body;
  try {
    await User.create(body);
    res.status(201).send({ message: "user has been created." });
  } catch (e) {
    next(e);
  }
};

//login a user
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const { isAdmin, password: pwd, ...userv2 } = user._doc;
    const token = createToken(user._id, user.isAdmin);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send(userv2);
  } catch (e) {
    next(e);
  }
};

module.exports = { register, login };
