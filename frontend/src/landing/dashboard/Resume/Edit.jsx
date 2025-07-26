import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import "./resume.css";

export default function EditResume() {
    return (
        <div>
            {/* Main layout for the resume editor */}

            <div className="edit-form row">

                {/* Left column: Resume form to enter/edit data */}
                <div className="col rounded-3 mb-3">
                    <ResumeForm />
                </div>

                {/* Right column: Live preview of the resume */}
                <div className="col col-no-grow  preview-column  rounded-3 mb-3">
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
}