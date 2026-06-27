const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getRecruiterJobs,
  getStudentAppliedJobs,
} = require('../controllers/jobController');

// Public routes
router.get('/', getJobs);
router.get('/:id', getJob);

// Protected routes
router.use(protect);

// Recruiter routes
router.post('/', authorize('recruiter'), createJob);
router.get('/recruiter/my-jobs', authorize('recruiter'), getRecruiterJobs);
router.put('/:id', authorize('recruiter'), updateJob);
router.delete('/:id', authorize('recruiter'), deleteJob);

// Student routes
router.get('/student/applied', authorize('student'), getStudentAppliedJobs);

module.exports = router;