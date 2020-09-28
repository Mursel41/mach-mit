'use strict';

const mongoose = require('mongoose');
const faker = require('faker');
const Activity = require('../models/ActivityModel');
const User = require('../models/UserModel');
const Category = require('../models/CategoryModel');

const seed = async () => {
  mongoose
    .connect('mongodb://localhost:27017/machMit', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => console.error(err));

  mongoose.connection.once('open', () => console.log('MongoDB running'));
  mongoose.connection.on('error', (err) => console.error(err));

  try {
    await Activity.deleteMany({});
    await User.deleteMany({});
  } catch (error) {
    console.log(error);
  }

  const capitalize = (str) =>
    str
      .split(' ')
      .map((word) =>
        word
          .split('')
          .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
          .join('')
      )
      .join(' ');

  const typeOfActivities = [
    '5f620bdbb4fa096f85804726',
    '5f620c20f12b4373545185a2',
    '5f620c2cf12b4373545185a3',
    '5f620c5af12b4373545185a4',
    '5f620c6ef12b4373545185a5',
    '5f620cb1f12b4373545185a6',
    '5f620cbbf12b4373545185a7',
    '5f620ccbf12b4373545185a8',
    '5f620cddf12b4373545185a9',
    '5f620cf8f12b4373545185ab',
    '5f620d1cf12b4373545185ad',
    '5f620d32f12b4373545185ae',
    '5f620dcfba8dcf75d8ac690c',
  ];
  const typeOfAttendee = ['Woman only', 'Man only', 'Mixed only', 'Any'];
  const genders = ['Male', 'Female', 'Other'];

  const randomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const fakeActivities = Array(10)
    .fill(null)
    .map(
      (item) =>
        new Activity({
          title: capitalize(faker.random.words(2)),
          description: capitalize(faker.random.words(6)),
          typeOfActivity: randomItem(typeOfActivities),
          typeOfAttendee: randomItem(typeOfAttendee),
          numberOfAttendee: faker.random.number({ min: 0, max: 20 }),
          address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            zip: faker.address.zipCode(),
          },
          startDate: faker.date.between('2020-09-15', '2020-09-30'),
          price: faker.finance.amount(0, 30, 2),
          image: faker.image.sports(),
        })
    );

  const fakeUsers = Array(10)
    .fill(null)
    .map(
      (item) =>
        new User({
          firstName: capitalize(faker.name.firstName()),
          lastName: capitalize(faker.name.lastName()),
          email: faker.internet.email(),
          password: faker.internet.password(),
          city: capitalize(faker.address.city()),
          age: faker.random.number({ min: 15, max: 90 }),
          gender: randomItem(genders),
          image: faker.image.avatar(),
          interests: [
            {
              name: faker.random.words(),
            },
          ],
        })
    );

  try {
    await Activity.create(fakeActivities);
    await User.create(fakeUsers);
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.close();
};

seed();
