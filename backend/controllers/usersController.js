const mongoose = require('mongoose');
const createError = require('http-errors');

const User = require('../models/UserModel');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = new User({ ...req.body, role: 'user' });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const user = await User.findById(req.params.id);
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, role: 'user' },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) throw new createError.NotFound();
    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const deleted = await User.findByIdAndRemove(req.params.id);
    if (!deleted) throw new createError.NotFound();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const loginUser = await User.findOne({ email: req.body.email });
    if (!loginUser) throw new createError.Unauthorized();
    const isAuthenticated = await loginUser.authenticate(req.body.password);
    if (!isAuthenticated) throw new createError.Unauthorized();
    const token = await loginUser.generateAuthToken();
    res.header('X-Auth-Token', token).status(200).send(loginUser);
  } catch (err) {
    next(err);
  }
};
