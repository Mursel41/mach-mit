const { Schema } = require('mongoose');




const AddressSchema = new Schema(
  {
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
  },
  { _id: false }
);


AddressSchema.pre('save', function (next) {
  const words = this.city.split(' ')
  this.city = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
  next()
})

module.exports = AddressSchema;
