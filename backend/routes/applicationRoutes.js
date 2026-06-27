const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  applyJob,
  getJobApplications,
  getMyApplications,
  updateApplicationStatus,
  withdrawApplication,
} = require('../controllers/applicationController');

// All routes require authentication
router.use(protect);

// Student routes
router.post('/', authorize('student'), applyJob);
router.get('/my-applications', getMyApplications);
router.delete('/:id', withdrawApplication);

// Recruiter routes
router.get(
  '/job/:jobId',
  authorize('recruiter'),
  getJobApplications
);
router.put(
  '/:id/status',
  authorize('recruiter'),
  updateApplicationStatus
);

module.exports = router;