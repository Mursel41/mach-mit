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

module.exports = AddressSchema;
