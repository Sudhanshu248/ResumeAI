import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import { ResumeInfoProvider } from "../../context/ResumeInfo";

export default function EditResume() {
    return (
        <ResumeInfoProvider>
            <div className="row">
                <div className="col">
                  <ResumeForm/>
                </div>
                <div className="col rounded-3 mb-3">
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoProvider>
    )
}