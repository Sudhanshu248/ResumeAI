import React, { createContext, useState, useContext } from 'react';
import axios from "axios";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    title: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      address: '',
      phone: '',
      email: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    themeColor: "#0d6efd"
  });

  const updatePersonalInfo = (data) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data }
    }));
  };

  const updateExperience = (experiences) => {
    setResumeData(prev => ({
      ...prev,
      experience: experiences
    }));
  };

  const updateEducation = (education) => {
    setResumeData(prev => ({
      ...prev,
      education: education
    }));
  };

  const updateSkills = (skills) => {
    setResumeData(prev => ({
      ...prev,
      skills: skills
    }));
  };

  const updateProjects = (projects) => {
    setResumeData(prev => ({
      ...prev,
      projects: projects
    }));
  };

  const updateCertifications = (certifications) => {
    setResumeData(prev => ({
      ...prev,
      certifications: certifications
    }));
  };

  const updateResumeData = (data) => {
    setResumeData(prev => ({
      ...prev,
      ...data
    }));
  };

  const createResume = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post('http://localhost:3002/api/create-resume', resumeData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      return response.data;
    } catch (error) {
      console.error('Error creating resume:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to create resume');
      } else if (error.request) {
        throw new Error('No response received from server');
      } else {
        throw new Error(error.message || 'Error creating resume');
      }
    }
  };

  const saveResume = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put(`http://localhost:3002/api/resume/${id}`, resumeData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      return response.data;
    } catch (error) {
      console.error('Error saving resume:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.message || 'Failed to save resume');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(error.message || 'Error saving resume');
      }
    }
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updatePersonalInfo,
      updateExperience,
      updateEducation,
      updateSkills,
      updateProjects,
      updateCertifications,
      updateResumeData,
      createResume,
      saveResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}; 