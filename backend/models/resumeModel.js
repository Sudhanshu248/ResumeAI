const mongoose = require('mongoose');

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
    personalInfo: {
        firstName: String,
        lastName: String,
        jobTitle: String,
        address: String,
        phone: String,
        email: String,
        summary: String
    },
    experience: [{
        company: String,
        position: String,
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
        gpa: String
    }],
    skills: [{
        name: String,
        rating: Number,
    }],
});
const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume; 