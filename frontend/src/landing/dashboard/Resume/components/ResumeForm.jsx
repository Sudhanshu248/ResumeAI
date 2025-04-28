import PersonalForm from "../forms/PersonalForm";
import SummaryForm from "../forms/SummaryForm";
import SkillForm from "../forms/SkillForm";
import ExperienceForm from "../forms/ExperienceForm";
import EducationForm from "../forms/EducationForm";
import Button from "@mui/material/Button";
import { LayoutGrid, ArrowRight , ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ResumeForm() {

    const [activeForm, setActiveForm] = useState(1);
    const [enableNext, setEnableNext] = useState(false);

    return (
        <div className="p-2">
            <div className="d-flex justify-content-between">
                <Button variant="outlined" color="info" >
                    <LayoutGrid />Theme
                </Button>
                <div className="d-flex gap-2">
                    {activeForm>1 && (
                      <Button variant="contained" color="info" onClick={()=>setActiveForm(activeForm-1)}>
                        <ArrowLeft /> Back
                      </Button>
                    )}

                     {activeForm<5 && (
                      <Button variant="contained" color="info" disabled={!enableNext} onClick={()=>setActiveForm(activeForm+1)}>
                            Next<ArrowRight />
                        </Button>
                     )}
                </div>
            </div>



             {activeForm === 1? <PersonalForm enableNext={(v)=>setEnableNext(v)}  />: null}
            {activeForm === 2? <SummaryForm />: null}
            {activeForm === 4? <ExperienceForm />: null}
            {activeForm === 5? <EducationForm />: null} 
            {activeForm === 3? <SkillForm />: null}


        </div>
    )
}
