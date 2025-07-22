import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from "../axiosConfig.js";

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

  const [resumes, setResumes] = useState([]);

  // Fetch all resumes from backend
  const fetchResumes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-resumes`);
      setResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  // Create a new resume in backend
  const createResume = async (newResume) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-resume`, newResume);
      setResumes(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error creating resume:", error);
      throw error;
    }
  };

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

  const updateResumeData = (newColor)=>{
    setResumeData(prev =>({
      ...prev , themeColor:newColor
    }))
  }

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      resumes,
      fetchResumes,
      createResume,
      updateResumeData,
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
