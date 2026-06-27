const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if requesting user is the same or admin
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this profile',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    // Check if user is updating their own profile or is admin
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this user',
      });
    }

    // Remove password from update body if present
    delete req.body.password;

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recruiter stats
// @route   GET /api/users/recruiter/stats
// @access  Private/Recruiter
exports.getRecruiterStats = async (req, res, next) => {
  try {
    const totalJobs = await Job.countDocuments({ postedBy: req.user.id });
    const activeJobs = await Job.countDocuments({
      postedBy: req.user.id,
      status: 'active',
    });
    const totalApplications = await Application.countDocuments({
      'job.postedBy': req.user.id,
    });

    // Get applications by status
    const applicationsByStatus = await Application.aggregate([
      {
        $lookup: {
          from: 'jobs',
          localField: 'job',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      { $unwind: '$jobDetails' },
      { $match: { 'jobDetails.postedBy': req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalJobs,
        activeJobs,
        totalApplications,
        applicationsByStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student stats
// @route   GET /api/users/student/stats
// @access  Private/Student
exports.getStudentStats = async (req, res, next) => {
  try {
    const totalApplications = await Application.countDocuments({
      applicant: req.user.id,
    });

    const applicationsByStatus = await Application.aggregate([
      { $match: { applicant: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalApplications,
        applicationsByStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};