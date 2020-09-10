const { Schema, model } = require('mongoose');

const Address = require('./AddressModel');

const ActivitySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  typeOfActivity: {
    type: Schema.Types.ObjectId,
    ref: 'CategoryModel',
    required: true,
  },
  typeOfAttendee: {
    type: String,
    required: true,
    enum: ['woman only', 'man only', 'mixed only', 'any'],
  },
  numberOfAttendee: {
    type: Number,
    required: true,
    default: 1,
  },
  address: {
    type: Address,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = model('Activity', ActivitySchema);
