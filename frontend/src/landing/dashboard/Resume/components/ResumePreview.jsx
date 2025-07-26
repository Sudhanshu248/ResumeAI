import { useResume } from "../../../../context/ResumeContext.jsx";
import Personal from "../preview/Personal.jsx";
import Summary from "../preview/Summary.jsx";
import Education from "../preview/Education.jsx";
import Experience from "../preview/Experience.jsx";
import Skills from "../preview/Skills.jsx";
import "../resume.css";

export default function ResumePreview() {
  // Access resume data from context

  const { resumeData } = useResume();

  const borderColor = resumeData.themeColor || "#0d6efd";

  // If resumeData is not available (possibly still loading), show a fallback preview
  if (!resumeData) return <div className="resume-preview border-bottom-0 border-start-0 border-end-0 mb-0 mt-0 pb-3 text-center rounded-4" style={{ border: `20px solid ${borderColor}` }}>
    <Personal resumes={resumeData} />
    <Summary resumes={resumeData} />
    <Experience resumes={resumeData} />
    <Education resumes={resumeData} />
    <Skills resumes={resumeData} />
  </div>;


  return (
    <div
      className="resume-preview forms-cards border-bottom-0 border-start-0 border-end-0 mb-0 mt-0 pb-3 text-center rounded-4"
      style={{
        border: `20px solid ${borderColor}`,
      }}
    >
      {/* Render each individual resume section */}
      <Personal resumes={resumeData} />
      <Summary resumes={resumeData} />
      <Experience resumes={resumeData} />
      <Education resumes={resumeData} />
      <Skills resumes={resumeData} />
    </div>
  );
}