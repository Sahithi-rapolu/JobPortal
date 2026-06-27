const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .pdf, .doc, and .docx files are allowed'));
    }
  },
}).single('resume');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private
exports.applyJob = async (req, res, next) => {
  try {
    // Handle file upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      const { jobId, coverLetter } = req.body;

      // Check if job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job not found',
        });
      }

      // Check if job is active
      if (job.status !== 'active') {
        return res.status(400).json({
          success: false,
          message: 'This job is no longer accepting applications',
        });
      }

      // Check if user already applied
      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: req.user.id,
      });

      if (existingApplication) {
        return res.status(400).json({
          success: false,
          message: 'You have already applied to this job',
        });
      }

      // Check if resume file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload your resume',
        });
      }

      // Create application
      const application = await Application.create({
        job: jobId,
        applicant: req.user.id,
        resume: req.file.path,
        coverLetter: coverLetter || '',
      });

      // Add applicant to job
      job.applicants.push(req.user.id);
      await job.save();

      res.status(201).json({
        success: true,
        application,
        message: 'Application submitted successfully',
      });
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications for a job (Recruiter)
// @route   GET /api/applications/job/:jobId
// @access  Private/Recruiter
exports.getJobApplications = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // Check if job exists and belongs to recruiter
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view applications for this job',
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email phone location skills')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's applications
// @route   GET /api/applications/my-applications
// @access  Private
exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate({
        path: 'job',
        populate: {
          path: 'postedBy',
          select: 'name email company',
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private/Recruiter
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, recruiterNotes } = req.body;

    const application = await Application.findById(req.params.id).populate(
      'job'
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    // Check if recruiter owns the job
    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application',
      });
    }

    application.status = status || application.status;
    application.recruiterNotes = recruiterNotes || application.recruiterNotes;
    application.updatedDate = Date.now();

    await application.save();

    res.status(200).json({
      success: true,
      application,
      message: 'Application status updated',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Withdraw application
// @route   DELETE /api/applications/:id
// @access  Private
exports.withdrawApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    // Check if user owns the application
    if (application.applicant.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to withdraw this application',
      });
    }

    // Remove applicant from job
    const job = await Job.findById(application.job);
    if (job) {
      job.applicants = job.applicants.filter(
        (applicant) => applicant.toString() !== req.user.id
      );
      await job.save();
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully',
    });
  } catch (error) {
    next(error);
  }
};