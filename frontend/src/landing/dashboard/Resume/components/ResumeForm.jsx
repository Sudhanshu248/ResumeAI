import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { ArrowRight, ArrowLeft } from "lucide-react";

import PersonalForm from "../forms/PersonalForm.jsx";
import SummaryForm from "../forms/SummaryForm.jsx";
import SkillForm from "../forms/SkillForm.jsx";
import ExperienceForm from "../forms/ExperienceForm.jsx";
import EducationForm from "../forms/EducationForm.jsx";
import ThemeSelector from "./ThemeSelector.jsx";
import { useResume } from "../../../../context/ResumeContext.jsx";

export default function ResumeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = parseInt(searchParams.get("step")) || 1;

  const [enableNext, setEnableNext] = useState(false);
  const { resumeData, updateThemeColor, loadResume } = useResume();

  useEffect(() => {
    if (id) {
      loadResume(id); // Load resume from backend on mount
    }
  }, [id]);

  const handleThemeChange = async (newColor) => {
    await updateThemeColor(newColor); // Saves to backend too
  };

  const handleNext = () => {
    setSearchParams({ step: step + 1 });
    setEnableNext(false);
  };

  const handleBack = () => {
    setSearchParams({ step: step - 1 });
  };

  const renderForm = () => {
    switch (step) {
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
          {step > 1 && (
            <Button variant="contained" color="info" onClick={handleBack}>
              <ArrowLeft className="me-1" /> Back
            </Button>
          )}

          {step < 6 && step>0 && enableNext && (
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
