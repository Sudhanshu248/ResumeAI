import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import { useResume } from "../../../context/ResumeContext.jsx";
import "./resume.css";

export default function EditResume() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { saveResume, createResume } = useResume();
    const [loading, setLoading] = useState(false);
    const [isNewResume, setIsNewResume] = useState(!id);

    return (
        <div>
            <div className="edit-form row">
                <div className="col rounded-3 mb-3">
                    <ResumeForm />
                </div>

                <div className="col col-no-grow  preview-column  rounded-3 mb-3">
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
}