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
    trim: true,
  },
  typeOfActivity: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
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
  },
  address: {
    type: Address,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    default: 'backend/assets/img/activity-default.jpg',
  },
});

ActivitySchema.method('toJSON', function () {
  return {
    _id: this._id,
    title: this.title,
    description: this.description,
    typeOfActivity: this.typeOfActivity,
    typeOfAttendee: this.typeOfAttendee,
    numberOfAttendee: this.numberOfAttendee,
    address: this.address,
    startDate: this.startDate,
    endDate: this.endDate,
    price: this.price,
    image: this.image,
  };
});

module.exports = model('Activity', ActivitySchema);
