const mongoose = require('mongoose');
const createError = require('http-errors');

const Activity = require('../models/ActivityModel');

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find().populate(
      'typeOfActivity',
      '-_id name'
    );
    res.status(200).send(activities);
  } catch (error) {
    next(error);
  }
};

exports.createActivity = async (req, res, next) => {
  try {
    const newActivity = new Activity(req.body);
    await newActivity.save();
    res.status(201).send(newActivity);
  } catch (error) {
    next(error);
  }
};

exports.getActivity = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const activity = await Activity.findById(req.params.id).populate(
      'typeOfActivity',
      '-_id name'
    );
    if (!activity) throw new createError.NotFound();
    res.status(200).send(activity);
  } catch (error) {
    next(error);
  }
};

exports.updateActivity = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('typeOfActivity', '-_id name');
    if (!updatedActivity) throw new createError.NotFound();
    res.status(200).send(updatedActivity);
  } catch (error) {
    next(error);
  }
};

exports.deleteActivity = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const deletedActivity = await Activity.findByIdAndRemove(req.params.id);
    if (!deletedActivity) throw new createError.NotFound();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
