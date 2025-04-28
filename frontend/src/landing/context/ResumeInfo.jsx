import { createContext, useState, useEffect } from "react";
import dummy from "../data/dummy";

export const ResumeInfoContext = createContext(null);

export function ResumeInfoProvider({ children }) {
    const [resumeInfo, setResumeInfo] = useState(null);

    useEffect(() => {
        setResumeInfo(dummy);
    }, []);

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {children}
        </ResumeInfoContext.Provider>
    );
}



