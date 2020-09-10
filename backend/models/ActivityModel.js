const { Schema, model } = require('mongoose');

const ActivitySchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  typeOfActivity: {
    type: String,
  },
  typeOfAttendee: {
    type: String,
  },
  numberOfAttendee: {
    type: Number,
  },
  address: {
    type: String,
  },
  date: {
    type: Date,
  },
  price: {
    type: Number,
  },
});

module.exports = model('Activity', ActivitySchema);
