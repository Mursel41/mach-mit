const express = require('express');
const router = express.Router();

const {
  getActivities,
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity,
} = require('../controllers/activitiesController');

const validator = require('../middleware/validator');
const activityRules = require('../utilities/validation/activity');
const authorizeToken = require('../middleware/tokenAuth');

router
  .route('/')
  .get(getActivities)
  .post(authorizeToken, validator(activityRules), createActivity);

router
  .route('/:id')
  .get(getActivity)
  .put(authorizeToken, validator(activityRules), updateActivity)
  .delete(authorizeToken, deleteActivity);

module.exports = router;
