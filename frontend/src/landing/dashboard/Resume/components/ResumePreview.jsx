import {  useEffect } from "react";
import { useResume } from "../../../../context/ResumeContext.jsx";
import dummy from "../../../data/dummy.jsx";
import PersonalInfo from "../preview/Personal.jsx";
import Summary from "../preview/Summary.jsx";
import Education from "../preview/Education.jsx";
import Experience from "../preview/Experience.jsx";
import Skills from "../preview/Skills.jsx";

export default function ResumePreview() {
    const { resumeData, setResumeData } = useResume();  
    
    const response = localStorage.getItem('ResumeData');
 
    useEffect(() => {
        if (response) {
          setResumeData(JSON.parse(response));
        }
      }, [response, setResumeData]);
      

    if (!resumeData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="border-bottom-0 border-start-0 border-end-0 mb-0 mt-0 pb-3 text-center rounded-4"
            style={{ boxShadow: "rgba(136, 165, 191, 0.48) 4px 4px 10px 0px, rgba(255, 255, 255, 0.8) -3px -3px 10px 0px", height: "98.5%", border: `20px solid ${resumeData.themeColor}`, borderColor: resumeData.themeColor, borderRadius: '0rem' }}>

            <PersonalInfo resumeData={resumeData} />
            <Summary resumeData={resumeData} />
            <Experience resumeData={resumeData} />
            <Education resumeData={resumeData} />
            <Skills resumeData={resumeData} />
        </div>
    )
}