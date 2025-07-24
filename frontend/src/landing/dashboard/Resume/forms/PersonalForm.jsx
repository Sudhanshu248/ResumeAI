import { useState, useEffect } from "react";
import { useResume } from "../../../../context/ResumeContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "../resume.css";

export default function PersonalForm({ enableNext }) {
    const { resumeData, updatePersonalInfo, updateResumeSection } = useResume(); //  Use updatePersonalInfo, not updateLocalResumeData
    const [loading, setLoading] = useState(false);
    const [wasValidated, setWasValidated] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        lastName: "",
        jobTitle: "",
        address: "",
        phone: "",
        email: "",
    });

    //  Sync form state when resumeData is loaded
useEffect(() => {
  if (
    resumeData?.personalInfo &&
    Object.keys(resumeData.personalInfo).length > 0 &&
    JSON.stringify(resumeData.personalInfo) !== JSON.stringify(personalInfo)
  ) {
    setPersonalInfo(resumeData.personalInfo); // ✅ Correct: set object
    enableNext(true);
  }
}, [resumeData]);

const handleChange = (e) => {
  const { name, value } = e.target;
  const updated = { ...personalInfo, [name]: value };
  setPersonalInfo(updated);
  updatePersonalInfo(updated); // updates context
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        setWasValidated(true); // <- trigger validation on submit
        setLoading(true);

        try {
            const { firstName, lastName, jobTitle, address, phone, email } = personalInfo;

            if (!firstName || !lastName || !jobTitle || !address || !phone || !email) {
                toast.error("Please fill out all fields.");
                enableNext(false);
                setLoading(false);
                return;
            }

            updatePersonalInfo(personalInfo);

            const response = await updateResumeSection({ personalInfo });
            console.log(" Server response after update:", response);
            toast.success("Personal details saved");
            enableNext(true);
        } catch (error) {
            toast.error("Failed to save personal details to server");
            console.error("Error updating personal info:", error);
        } finally {
            setLoading(false);
        }
    };





    return (
        <div
            className="pt-2 pb-5 ps-3 pe-3 rounded-4 mt-4"
            style={{
                height: "fit-content",
                borderTop: "5px solid #0d6ff2f2",
                boxShadow:
                    "rgba(136, 165, 191, 0.48) 4px 4px 10px 0px, rgba(255, 255, 255, 0.8) -3px -3px 10px 0px"
            }}
        >
            <h4 className="fw-bold pb-1 m-0 mt-2">Personal Detail</h4>
            <p className="pb-4">Get started with the basic information about yourself</p>

            <form className="needs-validation" noValidate onSubmit={handleSubmit}>

                            <div className="row g-3 justify-content-between">
                    <div className="col d-flex flex-column">
                        <label htmlFor="firstName" className="mb-1 fw-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className={`p-1 form-control ${wasValidated && !personalInfo.firstName ? "is-invalid" : ""}`}
                            value={personalInfo.firstName || ""}
                            onChange={(e) => handleChange (e)}
                            required
                        />
                        {wasValidated && !personalInfo.firstName && (
                            <div className="invalid-feedback d-block">First name is required.</div>
                        )}
                    </div>

                    <div className="col d-flex flex-column">
                        <label htmlFor="lastName" className="mb-1 fw-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className={`p-1 form-control ${wasValidated && !personalInfo.lastName ? "is-invalid" : ""}`}
                            value={personalInfo.lastName || ""}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {wasValidated && !personalInfo.lastName && (
                            <div className="invalid-feedback d-block">Last name is required.</div>
                        )}
                    </div>

                    <div className=" d-flex flex-column">
                        <label htmlFor="jobTitle" className="mb-1 fw-medium">Job Title</label>
                        <input
                            type="text"
                            name="jobTitle"
                            id="jobTitle"
                            className={`p-1 form-control ${wasValidated && !personalInfo.jobTitle ? "is-invalid" : ""}`}
                            value={personalInfo.jobTitle || ""}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {wasValidated && !personalInfo.jobTitle && (
                            <div className="invalid-feedback d-block">Job title is required.</div>
                        )}
                    </div>

                    <div className=" d-flex flex-column">
                        <label htmlFor="address" className="mb-1 fw-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            className={`p-1 form-control ${wasValidated && !personalInfo.address ? "is-invalid" : ""}`}
                            value={personalInfo.address || ""}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {wasValidated && !personalInfo.address && (
                            <div className="invalid-feedback d-block">Address is required.</div>
                        )}
                    </div>

                    <div className="col d-flex flex-column">
                        <label htmlFor="phone" className="mb-1 fw-medium">Phone</label>
                        <input
                            type="number"
                            name="phone"
                            id="phone"
                            className={`edit-phone p-1 form-control ${wasValidated && !personalInfo.phone ? "is-invalid" : ""}`}
                            value={personalInfo.phone || ""}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {wasValidated && !personalInfo.phone && (
                            <div className="invalid-feedback d-block">Phone number is required.</div>
                        )}
                    </div>

                    <div className="col d-flex flex-column">
                        <label htmlFor="email" className=" fw-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            style={{marginBottom: "0px !important"}}
                            className={`p-1 form-control ${wasValidated && !personalInfo.email ? "is-invalid" : ""}`}
                            value={personalInfo.email || ""}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {wasValidated && !personalInfo.email && (
                            <div className="invalid-feedback d-block">Email is required.</div>
                        )}
                    </div>


                    <div className="d-flex justify-content-center align-items-center text-end mt-3">
                        <button
                            className="btn btn-primary text-white fw-semibold fs-5 mx-auto px-4 py-2"
                            style={{ width: "7rem" }}
                            type="submit"
                        >
                            {loading ? <CircularProgress size={20} /> : "Save"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}