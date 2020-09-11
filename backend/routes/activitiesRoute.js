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

router
  .route('/')
  .get(getActivities)
  .post(validator(activityRules), createActivity);

router
  .route('/:id')
  .get(getActivity)
  .put(validator(activityRules), updateActivity)
  .delete(deleteActivity);

module.exports = router;
