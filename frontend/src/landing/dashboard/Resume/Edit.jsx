import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import { useResume } from "../../../context/ResumeContext.jsx";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

export default function EditResume() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { resumeData, saveResume, createResume } = useResume();
    const [loading, setLoading] = useState(false);
    const [isNewResume, setIsNewResume] = useState(!id);

    // Load resume data when component mounts
    useEffect(() => {
        if (!isNewResume) {
            const fetchResume = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        toast.error("Please login to view your resume");
                        return;
                    }

                    const response = await fetch(`http://localhost:3002/api/resume-by-id/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch resume');
                    }

                    const data = await response.json();
                    console.log('Resume data loaded:', data);
                    
                    // Update the context with the fetched data
                    // This would need to be implemented in your context
                    
                } catch (error) {
                    console.error('Error fetching resume:', error);
                    toast.error("Failed to load resume data");
                }
            };

            fetchResume();
        }
    }, [id, isNewResume]);

    const handleSaveResume = async () => {
        try {
            setLoading(true);
            
            if (isNewResume) {
                // Create a new resume
                const result = await createResume();
                toast.success("Resume created successfully!");
                // Navigate to the edit page for the new resume
                navigate(`/resume/${result.resume._id}/edit`);
            } else {
                // Save an existing resume
                await saveResume(id);
                toast.success("Resume saved successfully!");
            }
        } catch (error) {
            console.error('Error saving resume:', error);
            toast.error(error.message || "Failed to save resume");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col">
                    <ResumeForm/>
                </div>
                <div className="col rounded-3 mb-3">
                    <ResumePreview />
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <button 
                    className="btn btn-primary btn-lg" 
                    onClick={handleSaveResume}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : (isNewResume ? "Create Resume" : "Save Resume")}
                </button>
            </div>
        </div>
    );
}