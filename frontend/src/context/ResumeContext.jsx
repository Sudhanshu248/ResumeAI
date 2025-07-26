import { createContext, useState, useContext, useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from "../axiosConfig.js";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState("");
  const [resumes, setResumes] = useState([]);
  const [currentResumeId, setCurrentResumeId] = useState(null);


  //  DELETE resume by ID
  const deleteResume = async (resumeId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${BASE_URL}/delete-resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state after deletion
      setResumes(prev => prev.filter(resume => resume._id !== resumeId));
    } catch (error) {
      console.error("Error deleting resume:", error);
      throw error;
    }
  };


  //  Fetch all resumes (dashboard/list)
  const fetchResumes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/all-resumes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(response?.data?.resumes || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setResumes([]); // fallback
    }
  };



  //  Load resume by ID
  const loadResume = async (resumeId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/resume-by-id/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resume = response.data.resume;
      setResumeData(resume);
      setCurrentResumeId(resume._id);
    } catch (error) {
      console.error("Error loading resume:", error);
    }
  };


  //  Save current resume to backend
  const saveResume = async (resumeId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(`${BASE_URL}/update-resume/${resumeId}`, resumeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //  FIXED
        },

      });
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    }
  };

  //  Update one or more resume sections to backend
  const updateResumeSection = async (updatedFields) => {
    const token = localStorage.getItem("token");
    if (!currentResumeId) return;

    try {
      const response = await axios.put(
        `${BASE_URL}/update-resume/${currentResumeId}`,
        updatedFields,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResumeData((prev) => ({ ...prev, ...updatedFields }));
      return response.data; // <== This is where the data should come from

    } catch (error) {
      console.error("Error updating resume section:", error);
      throw error;
    }
  };




  //  Create new resume
  const createResume = async (newResume = {}) => {
    const token = localStorage.getItem("token");

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

  //  Local update (no backend)
  const updateLocalResumeData = (updatedSection) => {
    setResumeData((prev) => ({
      ...prev,
      ...updatedSection,
    }));
  };


  //  Update only the summary inside personalInfo
  const updateSummary = async (data) => {
    try {
      const updated = await updateResumeSection({ summy: data });
      return updated;
    } catch (err) {
      console.error(" Error updating experience:", err);
      throw err;
    }
  };
 


  //  Update entire personalInfo block (name, jobTitle, email, etc.)
  const updatePersonalInfo = async (data) => {
    try {
      const updated = await updateResumeSection({ personalInfo: data });
      return updated;
    } catch (err) {
      console.error(" Error updating experience:", err);
      throw err;
    }
  };

  //  Other section updates remain the same
  const updateExperience = async (data) => {
    try {
      const updated = await updateResumeSection({ experience: data });
      return updated;
    } catch (err) {
      console.error(" Error updating experience:", err);
      throw err;
    }
  };


  const updateEducation = async (data) => {
    try {
      const updated = await updateResumeSection({ education: data });
      return updated;
    } catch (err) {
      console.error(" Error updating education:", err);
      throw err;
    }
  };



  const updateSkills = async (data) => {
    try {
      const updated = await updateResumeSection({ skills: data });
      return updated;
    } catch (err) {
      console.error(" Error updating education:", err);
      throw err;
    }
  };

  const updateThemeColor = async (color) => {
    try {
      updateLocalResumeData({ themeColor: color }); // optional
      const updated = await updateResumeSection({ themeColor: color });
      return updated;
    } catch (err) {
      console.error(" Error updating theme color:", err);
      throw err;
    }
  };



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
        deleteResume,

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
