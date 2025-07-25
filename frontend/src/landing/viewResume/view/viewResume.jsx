import { Button } from "@mui/material";
import ResumePreview from "../../dashboard/Resume/components/ResumePreview";
import { useResume } from "../../../context/ResumeContext.jsx";
import "./ViewResume.css";
import { useNavigate } from "react-router-dom";

export default function ViewResume() {
    const { resumeData, setResumeData } = useResume();
    const navigate = useNavigate();
    const handleDownloadPDF = () => {
        window.print();
    }

    return (
        <>
            <div id="no-print">
                <div className="text-center p-3 m-2">
                    <h2 className="text-success p-2 rounded-3">Congratulations! Your resume has been successfully created.</h2>
                    <p className="text-muted">Thank you for using our resume builder. Your resume is now ready to be used in your job applications.</p>

                    <div className="d-flex justify-content-evenly align-items-center gap-3 p-2">
                        <Button variant="contained" color="primary" onClick={handleDownloadPDF}>Download PDF</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/dashboard')}
                        >
                            Go to Dashboard
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-3" style={{ width: '97%', margin: '0 auto 4rem' }}>
                <ResumePreview />
            </div>
        </>
    );
}