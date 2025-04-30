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


       
    const handleSaveResume = async () => {
        try {
            setLoading(true);
            
            if (isNewResume) {
               
                const result = await createResume();
            
                navigate(`/resume/${result.resume._id}/edit`);
            } else {
              
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