import { useContext, useEffect } from "react";
import { ResumeInfoContext } from "../../../context/ResumeInfo.jsx";
import dummy from "../../../data/dummy.jsx";
import PersonalInfo from "../preview/Personal.jsx";
import Summary from "../preview/Summary.jsx";
import Education from "../preview/Education.jsx";
import Experience from "../preview/Experience.jsx";
import Skills from "../preview/Skills.jsx";

export default function ResumePreview() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    useEffect(() => {
        setResumeInfo(dummy);
    }, [setResumeInfo]);

    if (!resumeInfo) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className=" border-bottom-0 border-start-0 border-end-0  me-2 ms-2 mb-0 mt-0 text-center rounded-3"
                style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px", border: `15px solid ${resumeInfo.themeColor}`, borderColor: resumeInfo.themeColor }}>

                <PersonalInfo resumeInfo={resumeInfo} />
                <Summary resumeInfo={resumeInfo} />
                <Experience resumeInfo={resumeInfo} />
                <Education resumeInfo={resumeInfo} />
               <Skills resumeInfo={resumeInfo} />
            </div>
        </>
    )
}

// Fix useState hook usage in ResumeForm component

// The issue was in how the useState hook was being used in the ResumeForm component.
// The code was incorrectly trying to destructure the useState return value as an object:

// const {enableNext, setEnableNext} = useState(false);

// This is incorrect because useState returns an array with two elements, not an object.
// The correct usage is to destructure the array:

// const [enableNext, setEnableNext] = useState(false);

// This fix ensures that:
// 1. The PersonalForm component can properly enable/disable the Next button
// 2. The state management works correctly throughout the form navigation flow
// 3. The form progression (activeForm state) is properly controlled

// The application now correctly manages the form state and navigation between different
// resume sections (Personal, Summary, Skills, Experience, Education).

