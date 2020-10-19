const mongoose = require('mongoose');

const Activity = require('../models/ActivityModel');
const User = require('../models/UserModel');
const Category = require('../models/CategoryModel');

(async () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/machMit', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => console.error(err));
  mongoose.connection.on('open', () => console.log('MongoDB running'));
  mongoose.connection.on('error', (err) => console.error(err));

  try {
    await User.deleteMany({});
    await Activity.deleteMany({});
    await Category.deleteMany({});
  } catch (err) {
    console.log(err);
  }

  mongoose.connection.close();
})();
