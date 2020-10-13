const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    //unique: true,
  },
  categoryImage: {
    type: String,
    default: '/assets/categories/activity-default.jpg',
  },
});

CategorySchema.method('toJSON', function () {
  return {
    _id: this._id,
    name: this.name,
    categoryImage: this.categoryImage,
  };
});

module.exports = model('Category', CategorySchema);
