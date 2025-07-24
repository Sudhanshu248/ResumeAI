import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import PersonalForm from "../forms/PersonalForm.jsx";
import SummaryForm from "../forms/SummaryForm.jsx";
import SkillForm from "../forms/SkillForm.jsx";
import ExperienceForm from "../forms/ExperienceForm.jsx";
import EducationForm from "../forms/EducationForm.jsx";
import ThemeSelector from "./ThemeSelector.jsx";
import { useResume } from "../../../../context/ResumeContext.jsx";
import { useEffect } from "react";

export default function ResumeForm() {
  const [activeForm, setActiveForm] = useState(4);
  const [enableNext, setEnableNext] = useState(false);
  const { id } = useParams();
const { resumeData, updateThemeColor } = useResume();

  useEffect(()=>{
 console.log(enableNext);
  }, [])

const handleThemeChange = async (newColor) => {
  await updateThemeColor(newColor); // ✅ this saves to backend too
};


  const handleNext = () => {
    setActiveForm((prev) => prev + 1);
    setEnableNext(false); // Reset on new form
  };

  const handleBack = () => {
    setActiveForm((prev) => prev - 1);
  };

  const renderForm = () => {
    switch (activeForm) {
      case 1:
        return <PersonalForm enableNext={setEnableNext} />;
      case 2:
        return <SummaryForm enableNext={setEnableNext} />;
      case 3:
        return <ExperienceForm enableNext={setEnableNext} />;
      case 4:
        return <EducationForm enableNext={setEnableNext} />;
      case 5:
        return <SkillForm enableNext={setEnableNext} />;
      case 6:
        return <Navigate to={`/resume/${id}/view`} />;
      default:
        return null;
    }
  };

  return (
    <div className="py-2">
      <div className="d-flex justify-content-between mb-3">
        <ThemeSelector
          currentTheme={resumeData?.themeColor}
          onThemeChange={handleThemeChange}
        />

        <div className="d-flex gap-2">
          {activeForm > 1 && (
            <Button variant="contained" color="info" onClick={handleBack}>
              <ArrowLeft className="me-1" /> Back
            </Button>
          )}

          {activeForm < 6 && enableNext && (
            <Button
              variant="contained"
              color="info"
              disabled={!enableNext}
              onClick={handleNext}
            >
              Next <ArrowRight className="ms-1" />
            </Button>
          )}
        </div>
      </div>

      {renderForm()}
    </div>
  );
}
