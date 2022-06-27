const User = require("../models/User");

//GET ALL
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};
//GET
const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};
//UPDATE
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(201).send(updatedUser);
  } catch (e) {
    next(e);
  }
};
//DELETE
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: "user has been deleted!" });
  } catch (e) {
    next(e);
  }
};
module.exports = { updateUser, deleteUser, getUsers, getUser };
