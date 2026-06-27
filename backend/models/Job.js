const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a job title'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true,
    },
    companyLogo: {
      type: String,
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
      trim: true,
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
      required: [true, 'Please add job type'],
    },
    experience: {
      type: String,
      enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Manager'],
      required: [true, 'Please add experience level'],
    },
    salary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a job description'],
    },
    requirements: {
      type: [String],
      required: [true, 'Please add job requirements'],
    },
    responsibilities: {
      type: [String],
    },
    skills: {
      type: [String],
      required: [true, 'Please add required skills'],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'closed', 'draft'],
      default: 'active',
    },
    applicationDeadline: {
      type: Date,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
jobSchema.index({
  title: 'text',
  company: 'text',
  description: 'text',
  skills: 'text',
});

module.exports = mongoose.model('Job', jobSchema);