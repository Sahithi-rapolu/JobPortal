const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private/Recruiter
exports.createJob = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.postedBy = req.user.id;

    // Check if user is recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({
        success: false,
        message: 'Only recruiters can post jobs',
      });
    }

    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      job,
      message: 'Job posted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res, next) => {
  try {
    const {
      keyword,
      location,
      jobType,
      experience,
      skills,
      page = 1,
      limit = 10,
    } = req.query;

    // Build query
    const query = { status: 'active' };

    // Search
    if (keyword) {
      query.$text = { $search: keyword };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (experience) {
      query.experience = experience;
    }

    if (skills) {
      const skillsArray = skills.split(',');
      query.skills = { $in: skillsArray };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const jobs = await Job.find(query)
      .populate('postedBy', 'name email company')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Job.countDocuments(query);

    // Increment views for each job
    jobs.forEach(async (job) => {
      job.views += 1;
      await job.save();
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      'postedBy',
      'name email company companyDescription'
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Increment views
    job.views += 1;
    await job.save();

    // Check if user has applied
    let hasApplied = false;
    if (req.user) {
      const application = await Application.findOne({
        job: job._id,
        applicant: req.user.id,
      });
      hasApplied = !!application;
    }

    res.status(200).json({
      success: true,
      job,
      hasApplied,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private/Recruiter
exports.updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Check ownership
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job',
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      job,
      message: 'Job updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private/Recruiter
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Check ownership
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job',
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recruiter's jobs
// @route   GET /api/jobs/recruiter/my-jobs
// @access  Private/Recruiter
exports.getRecruiterJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get jobs by user (for students to see their applied jobs)
// @route   GET /api/jobs/student/applied
// @access  Private/Student
exports.getStudentAppliedJobs = async (req, res, next) => {
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