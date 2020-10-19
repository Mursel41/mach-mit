const express = require('express');
const router = express.Router();

const {
  getActivities,
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getLocations,
  joinActivity,
  leaveActivity,
} = require('../controllers/activitiesController');

const validator = require('../middleware/validator');
const activityRules = require('../utilities/validation/activity');
const authorizeToken = require('../middleware/tokenAuth');

router
  .route('/')
  .get(getActivities)
  .post(authorizeToken, validator(activityRules), createActivity);

router.route('/locations').get(getLocations);

router
  .route('/:id')
  .get(getActivity)
  .put(authorizeToken, validator(activityRules), updateActivity)
  .delete(authorizeToken, deleteActivity);

router.route('/:id/join').post(joinActivity);
router.route('/:id/leave').post(leaveActivity);

module.exports = router;
