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
    experience: [{
      id:1,
      companyName:'',
      startDate:'',
      endDate:'',
      jobTitle:'',
      workSummary:''
    }],
    education:[{
      id:1,
      universityName:'',
      startDate:'',
      endDate:'',
      degree:'',
      major:'',
      description:''
    }],
    skills: [
      {
        id:1,
        name:'',
        rating:''
      }
    ],
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



 

 


  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      updatePersonalInfo,
      updateExperience,
      updateEducation,
      updateSkills
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