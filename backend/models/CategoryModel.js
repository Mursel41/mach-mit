const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

CategorySchema.method('toJSON', function () {
  return {
    _id: this._id,
    name: this.name,
  };
});

module.exports = model('Category', CategorySchema);
