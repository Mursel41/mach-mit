const { Schema, model } = require('mongoose');

const Address = require('./AddressModel');

const { encrypt, check } = require('../utilities/encryption');
const { sign, verify } = require('../utilities/authentication');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    interests: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: false,
      },
    ],
    image: {
      type: String,
      default: 'assets/img/user-profile-default.png',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
      default: 'user',
    },
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

UserSchema.virtual('createdActivities', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'creator',
});

UserSchema.virtual('participatedActivities', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'participants',
});

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await encrypt(this.password);
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  if (!this._update.hasOwnProperty('password')) return next();

  this._update.password = await encrypt(this._update.password);
  next();
});

UserSchema.method('authenticate', async function (loginPassword) {
  return await check(loginPassword, this.password);
});

UserSchema.method('toJSON', function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    fullName: this.fullName,
    city: this.city,
    interests: this.interests,
    age: this.age,
    gender: this.gender,
    image: this.image,
    createdActivities: this.createdActivities,
    participatedActivities: this.participatedActivities,
  };
});

const tokenSecret = 'fsdfkljsglkj7dfgljfghkljlkdfsjglkdfg3';

UserSchema.method('generateAuthToken', async function () {
  const token = await sign({ _id: this._id, access: 'auth' }, tokenSecret);
  return token;
});

UserSchema.static('findByToken', async function (token) {
  let payload;
  try {
    payload = await verify(token, tokenSecret);
  } catch (error) {
    return null;
  }
  const user = await this.findOne({ _id: payload._id });
  return user;
});

module.exports = model('User', UserSchema);
