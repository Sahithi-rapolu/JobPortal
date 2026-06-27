const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getRecruiterStats,
  getStudentStats,
} = require('../controllers/userController');

// All routes require authentication
router.use(protect);

// Admin routes
router.get('/', authorize('admin'), getAllUsers);
router.delete('/:id', authorize('admin'), deleteUser);

// User routes
router.get('/:id', getUserById);
router.put('/:id', updateUser);

// Stats
router.get('/recruiter/stats', authorize('recruiter'), getRecruiterStats);
router.get('/student/stats', authorize('student'), getStudentStats);

module.exports = router;