'use strict';

const mongoose = require('mongoose');

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

  mongoose.connection.close();
};

seed();
