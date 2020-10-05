const { Schema, model } = require('mongoose');


const ActivitySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  typeOfActivity: {
    type: String,
    required: true,
  },
  typeOfAttendee: {
    type: String,
    required: true,
    enum: ['Man only', 'Woman only', 'Mixed'],
  },
  numberOfAttendee: {
    type: Number,
    required: true,
  },
  paid: {
    type: String
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    //default: Date.now(),
  },
  price: {
    type: Number,
    // required: true,
    default: 1,
  },
  image: {
    type: String,
    default: 'assets/img/activity-default.jpg',
  },
  creator: {
    type: Schema.Types.ObjectId,
    //required: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      //required: true,
    },
  ],
});

ActivitySchema.method('toJSON', function () {
  return {
    _id: this._id,
    title: this.title,
    description: this.description,
    typeOfActivity: this.typeOfActivity,
    typeOfAttendee: this.typeOfAttendee,
    numberOfAttendee: this.numberOfAttendee,
    street: this.street,
    city: this.city,
    zip: this.zip,
    startDate: this.startDate,
    price: this.price,
    image: this.image,
  };
});

module.exports = model('Activity', ActivitySchema);
