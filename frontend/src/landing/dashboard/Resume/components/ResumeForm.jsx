import PersonalForm from "../forms/PersonalForm";
import SummaryForm from "../forms/SummaryForm";
import SkillForm from "../forms/SkillForm";
import ExperienceForm from "../forms/ExperienceForm";
import EducationForm from "../forms/EducationForm";
import Button from "@mui/material/Button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useResume } from "../../../../context/ResumeContext.jsx";
import ThemeSelector from "./ThemeSelector";

export default function ResumeForm() {
    const [activeForm, setActiveForm] = useState(1);
    const [enableNext, setEnableNext] = useState(false);
    const { id } = useParams();
    const { resumeData, updateResumeData } = useResume();

    const handleThemeChange = (newColor) => {
        updateResumeData(prevState => ({
            ...prevState,
            themeColor: newColor
        }));
    };

    return (
        <div className="p-2">
            <div className="d-flex justify-content-between">
                <ThemeSelector 
                    currentTheme={resumeData?.themeColor} 
                    onThemeChange={handleThemeChange}
                />
                <div className="d-flex gap-2">
                    {activeForm > 1 && (
                        <Button variant="contained" color="info" onClick={() => setActiveForm(activeForm - 1)}>
                            <ArrowLeft /> Back
                        </Button>
                    )}

                    {activeForm < 6 && (
                        <Button variant="contained" color="info" disabled={!enableNext} onClick={() => {
                            setActiveForm(activeForm + 1);
                            setEnableNext(false);
                            localStorage.setItem('ResumeData', JSON.stringify(resumeData));
                        }}>
                            Next<ArrowRight />
                        </Button>
                    )}
                </div>
            </div>

            {activeForm === 1 ? <PersonalForm enableNext={(v) => setEnableNext(v)} /> : null}
            {activeForm === 2 ? <SummaryForm enableNext={(v) => setEnableNext(v)} /> : null}
            {activeForm === 3 ? <ExperienceForm enableNext={(v) => setEnableNext(v)} /> : null}
            {activeForm === 4 ? <EducationForm enableNext={(v) => setEnableNext(v)} /> : null}
            {activeForm === 5 ? <SkillForm enableNext={(v) => setEnableNext(v)} /> : null}
            {activeForm === 6 ? <Navigate to={`/resume/${id}/view`}  resumeData={resumeData} /> : null}
        </div>
    )
}