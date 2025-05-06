import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

const ResumeContext = createContext();

// const backendBaseURL = 'https://resumeai-itv1.onrender.com/api';

// const axiosInstance = axios.create({
//   baseURL: backendBaseURL,
//   withCredentials: true,
// });

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

  // const [resumesList, setResumesList] = useState([]);
  // const [loading, setLoading] = useState(false);


  // const fetchAllResumes = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get('/all-resumes');
  //     setResumesList(response.data);
  //   } catch (error) {
  //     console.error('Error fetching resumes:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  // const fetchResumeById = async (id) => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get(`/resume-by-id/${id}`);
  //     setResumeData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching resume:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // const createResume = async (newResume) => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.post('/create-resume', newResume);
   
  //     await fetchAllResumes();
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error creating resume:', error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const updateResumeData = (newColor)=>{
    setResumeData(prev =>({
      ...prev , themeColor:newColor
    }))
  }

  
  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      // resumesList,
      // loading,
      // fetchAllResumes,
      // fetchResumeById,
      // createResume,
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
