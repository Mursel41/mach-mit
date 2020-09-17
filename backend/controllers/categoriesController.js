const mongoose = require('mongoose');
const createError = require('http-errors');

const Category = require('../models/CategoryModel');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) throw new createError.NotFound();
    res.status(200).send(updatedCategory);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new createError.NotFound();
    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    if (!deletedCategory) throw new createError.NotFound();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
