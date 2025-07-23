import mongoose from "mongoose";


const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true 
  },
  personalInfo: [{
    firstName: String,
    lastName: String,
    jobTitle: String,
    address: String,
    phone: String,
    email: String,
    summary: String
  }],
  summary: [{
    type: String,
  }],
  experience: [{
    company: String,
    position: String,
    city: String,
    state: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  skills: [{
    name: String,
    rating: Number
  }],
  themeColor: [{
    type: String,
    default: "#0d6efd"
  }]
}, { timestamps: true });


const Resume = mongoose.model('Resume', resumeSchema);

export default Resume; 