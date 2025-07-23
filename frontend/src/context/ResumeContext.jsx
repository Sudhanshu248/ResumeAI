import { createContext, useState, useContext, useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from "../axiosConfig.js"
import { v4 as uuidv4 } from 'uuid';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState("");
  const [resumes, setResumes] = useState([]);
  const [currentResumeId, setCurrentResumeId] = useState(null);

  // ✅ Fetch all resumes (dashboard/list)
  const fetchResumes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/all-resumes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setResumes(response?.data?.resumes || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setResumes([]); // fallback
    }
  };


  // ✅ Load resume by ID
  const loadResume = async (resumeId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/resume-by-id/${resumeId}`, {
        headers: { Authorization: token },
      });
      const resume = response.data.resume;
      setResumeData(resume);
      setCurrentResumeId(resume._id);
    } catch (error) {
      console.error("Error loading resume:", error);
    }
  };

  // ✅ Save current resume to backend
  const saveResume = async (resumeId) => {
    const token = localStorage.getItem("token");
    console.log("saveResume funciton is running ", resumeData);
    try {
      await axios.put(`${BASE_URL}/update-resume/${resumeId}`, resumeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    }
  };

  // ✅ Update one or more resume sections to backend
  const updateResumeSection = async (updatedFields) => {
    const token = localStorage.getItem("token");
    console.log("UpdateResumeScetion  funciton is running ", updatedFields);

    const id = uuidv4();
    try {
      await axios.post(`${BASE_URL}/update-resume/${id}`, updatedFields, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setResumeData(prev => ({ ...prev, ...updatedFields }));
    } catch (error) {
      console.error("Error updating resume section:", error);
    }
  };

  // ✅ Create new resume
  const createResume = async (newResume = {}) => {
    const token = localStorage.getItem("token");
    console.log("Create Resume  funciton is running ", newResume);
    try {
      const response = await axios.post(`${BASE_URL}/create-resume`, newResume, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const created = response.data.resume;
      setCurrentResumeId(created._id);
      setResumeData(created);
      setResumes(prev => [...prev, created]);
      return created;
    } catch (error) {
      console.error("Error creating resume:", error);
      throw error;
    }
  };

  // ✅ Local update (no backend)
  const updateLocalResumeData = (updatedSection) => {
    setResumeData((prev) => ({
      ...prev,
      ...updatedSection,
    }));
  };

  // ✅ Update entire personalInfo block (name, jobTitle, email, etc.)
  const updatePersonalInfo = (data) => {
    updateLocalResumeData({
      personalInfo: {
        ...resumeData?.personalInfo,
        ...data,
      },
    });
  };

  // ✅ Update only the summary inside personalInfo
  const updateSummary = (summary) => {
    updateLocalResumeData({
      personalInfo: {
        ...resumeData?.personalInfo,
        summary,
      },
    });
  };

  // ✅ Other section updates remain the same
  const updateExperience = (data) =>
    updateLocalResumeData({ experience: data });

  const updateEducation = (data) =>
    updateLocalResumeData({ education: data });

  const updateSkills = (data) =>
    updateLocalResumeData({ skills: data });

  const updateThemeColor = (color) =>
    updateLocalResumeData({ themeColor: color });


  // Load all resumes on initial mount
  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        resumes,
        currentResumeId,
        setResumeData, // exposed in case needed directly
        fetchResumes,
        createResume,
        loadResume,
        saveResume,
        updateResumeSection,

        // Section-specific helpers
        updateLocalResumeData,
        updatePersonalInfo,
        updateSummary,
        updateExperience,
        updateEducation,
        updateSkills,
        updateThemeColor,
      }}
    >
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
