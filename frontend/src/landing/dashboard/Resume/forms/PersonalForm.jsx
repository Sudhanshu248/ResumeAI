import { useState } from "react";
import { useResume } from "../../../../context/ResumeContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import "../resume.css";

export default function PersonalForm({ enableNext }) {
    const { resumeData, updatePersonalInfo } = useResume();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Update the resume data in the context
        updatePersonalInfo({
            firstName: resumeData.personalInfo.firstName,
            lastName: resumeData.personalInfo.lastName,
            jobTitle: resumeData.personalInfo.jobTitle,
            address: resumeData.personalInfo.address,
            phone: resumeData.personalInfo.phone,
            email: resumeData.personalInfo.email
        });       

        enableNext(true);
        setLoading(false);
       
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        updatePersonalInfo({ [name]: value });
    };

    // <div className="pt-3 pb-5 ps-3 pe-3 rounded-3 mt-4" style={{ height: "fit-content", borderTop: "8px solid #0d6ff2f2", boxShadow: "rgba(136, 165, 191, 0.48) 4px 4px 10px 0px, rgba(255, 255, 255, 0.8) -3px -3px 10px 0px"}}>
    return (

        <div className="pt-2 pb-5 ps-3 pe-3 rounded-4 mt-4 " style={{ height: "fit-content", borderTop: "5px solid #0d6ff2f2", boxShadow: "rgba(136, 165, 191, 0.48) 4px 4px 10px 0px, rgba(255, 255, 255, 0.8) -3px -3px 10px 0px"}}>
            <h4 className="fw-bold pb-1 m-0 mt-2">Personal Detail</h4>
            
            <p className="pb-4">Get started with the basic information about yourself</p>

            <form onSubmit={handleSubmit}>
                <div className="row g-3 justify-content-between">

                    <div className="col d-flex flex-column">
                        <label htmlFor="firstName" className="mb-1 fw-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            className="p-1"
                            id="firstName"
                            onChange={handleChange}
                            value={resumeData.personalInfo?.firstName || "" }         
                        />
                    </div>

                    <div className="col d-flex flex-column">
                        <label htmlFor="lastName" className="mb-1 fw-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            className="p-1"
                            id="lastName"
                            onChange={handleChange}
                            value={resumeData.personalInfo?.lastName || ""}
                        />
                    </div>

                    <div className=" d-flex flex-column">
                        <label htmlFor="jobTitle" className="mb-1 fw-medium">Job Title</label>
                        <input
                            type="text"
                            name="jobTitle"
                            required
                            className="p-1"
                            id="jobTitle"
                            value={resumeData.personalInfo?.jobTitle || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className=" d-flex flex-column">
                        <label htmlFor="address" className="mb-1 fw-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            required
                            className="p-1"
                            id="address"
                            value={resumeData.personalInfo?.address || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col d-flex flex-column">
                        <label htmlFor="phone" className="mb-1 fw-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            required
                            className="edit-phone p-1"
                            id="phone"
                            value={resumeData.personalInfo?.phone || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col d-flex flex-column">
                        <label htmlFor="email" className="mb-1 fw-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="p-1 border border-1 border-dark"
                            id="email"
                            value={resumeData.personalInfo?.email || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className=" d-flex justify-content-center align-items-center text-end">
                        <button className="btn btn-primary text-white fw-semibold fs-5  mx-auto pe-1 ps-1 py-1  " style={{ width: "7rem" }} disabled={loading} type="submit">{loading ? <CircularProgress size={20} /> : "Save"}</button>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}
