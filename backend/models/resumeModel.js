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
  }],
  summary: [{
    type: String,
  }],
experience: [{
  jobTitle: String,
  companyName: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: String,
  currentlyWorking: Boolean
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
  themeColor: {
    type: String,
    default: "#0d6efd"
  }
}, { timestamps: true });


const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;