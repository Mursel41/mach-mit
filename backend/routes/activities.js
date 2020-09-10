const express = require('express');
const router = express.Router();

const {
  getActivities,
  createActivity,
} = require('../controllers/activitiesController');

router.route('/').get(getActivities).post(createActivity);

module.exports = router;
