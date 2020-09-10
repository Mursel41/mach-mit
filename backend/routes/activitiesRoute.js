const express = require('express');
const router = express.Router();

const {
  getActivities,
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity,
} = require('../controllers/activitiesController');

router.route('/').get(getActivities).post(createActivity);

router
  .route('/:id')
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity);

module.exports = router;
