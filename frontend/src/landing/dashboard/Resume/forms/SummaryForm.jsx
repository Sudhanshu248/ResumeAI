import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useResume } from "../../../../context/ResumeContext.jsx";
import { AIChatSession } from "../../../../server/AIModel.js";
import TextEditor from "react-simple-wysiwyg";
import { toast } from "react-toastify";

export default function SummaryForm({enableNext}) {
    const {resumeData, updatePersonalInfo} = useResume();
    const [summary, setSummary] = useState(resumeData?.personalInfo?.summary || "");
    const [loading, setLoading] = useState(false);
    const prompt = `Job Title: ${resumeData?.personalInfo?.jobTitle} , Depend on my job title give me summary for my resume within 4-5 lines`;

    useEffect(() => {
        enableNext(false);
    }, [summary]);

    const generateSummaryAI = async () => {

        try {

            setLoading(true);
            const response = await AIChatSession.sendMessage(prompt);
            const responseText = await response.response.text();
            const parsedResponse = JSON.parse(responseText);
          
            const formattedSummary = parsedResponse.summary.join('\n\n');
            
            setSummary(formattedSummary);
            updatePersonalInfo({ summary: formattedSummary });
            
        } catch (error) {
            console.error("Error generating summary:", error);
           
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            if (!summary.trim()) {
                toast.error("Please add a summary");
                enableNext(false);
                return;
            }
            
            updatePersonalInfo({ summary: summary });
          
            enableNext(true);

        } catch (error) {          
            enableNext(false);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="pt-2 pb-5 ps-3 pe-3 rounded-4 mt-4 " style={{ height: "fit-content", borderTop: "5px solid #0d6ff2f2", boxShadow: "rgba(136, 165, 191, 0.48) 4px 4px 10px 0px, rgba(255, 255, 255, 0.8) -3px -3px 10px 0px"}}>

        {/* <div className="pt-3 pb-5 ps-3 pe-3 rounded-3 mt-4" style={{ height: "fit-content", borderTop: "8px solid #0d6ff2f2", boxShadow: "rgba(136, 165, 191, 0.48) 4px 4px 10px 0px, rgba(255, 255, 255, 0.8) -3px -3px 10px 0px"}}> */}
            <h4 className="fw-bold pb-1 m-0 mt-2">Summary</h4>
            <p className="pb-4">Add a summary of your career and skills</p>

            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between p-2">
                    <label htmlFor="summary" className="mb-1 fw-medium">Summary</label>
                    <Button 
                        variant="outlined" 
                        color="info" 
                        className="rounded-2" 
                        style={{ border: "1px solid rgba(193, 87, 246, 0.95)", backgroundColor: "rgba(255, 255, 255, 0.95)", color: "rgba(168, 36, 220, 0.95)" }} 
                        onClick={generateSummaryAI}
                        disabled={loading}
                        type="button"
                    >
                        {loading ? <CircularProgress size={20} /> : "Generate From AI"}
                    </Button>
                </div>

                <TextEditor 
                    name="summary" 
                    id="summary" 
                    className="form-control p-2" 
                    required 
                    placeholder="Summary" 
                    value={summary}
                    onChange={(e)=>setSummary(e.target.value)}
                />

                <div className="d-flex justify-content-center align-items-center text-end mt-4">
                    <button 
                        className="btn btn-primary text-white fw-semibold fs-5 mx-auto pe-1 ps-1 py-1" 
                        style={{width:"7rem"}} 
                        disabled={loading} 
                        type="submit"
                    >
                        {loading ? <CircularProgress size={20} /> : "Save"}
                    </button>
                </div>
            </form>
        </div>
    )
}