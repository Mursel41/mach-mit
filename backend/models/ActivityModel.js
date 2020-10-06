const { Schema, model } = require('mongoose');
const Address = require('./AddressModel');


const ActivitySchema = new Schema(
  {
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
      enum: ['Woman only', 'Man only', 'Mixed only', 'Any'],
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
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      default: '/assets/img/activity-default.jpg',
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      //required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        //required: true,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

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
    price: this.price,
    image: this.image,
    creator: this.creator,
    participants: this.participants,
  };
});

module.exports = model('Activity', ActivitySchema);
