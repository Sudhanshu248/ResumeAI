import mongoose from "mongoose";

// Define the schema for a resume
const resumeSchema = new mongoose.Schema({
  // Reference to the user who owns the resume
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Title of the resume (e.g., "Frontend Developer Resume")
  title: {
    type: String,
    required: true 
  },

  // Personal information section
  personalInfo: [{
    firstName: String,
    lastName: String,
    jobTitle: String,
    address: String,
    phone: String,
    email: String,
  }],

  // Professional summary section
  summary: [{
    type: String,
  }],

  // Work experience section
  experience: [{
    jobTitle: String,
    companyName: String,
    location: String,
    startDate: Date,
    endDate: Date,
    description: String,
    currentlyWorking: Boolean
  }],

  // Education background section
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],

  // List of skills with optional rating
  skills: [{
    name: String,
    rating: Number
  }],

  // Theme color preference for the resume
  themeColor: {
    type: String,
    default: "#0d6efd"
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create Resume model from schema
const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
