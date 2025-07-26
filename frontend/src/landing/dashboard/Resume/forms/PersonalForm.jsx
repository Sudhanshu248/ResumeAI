import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useResume } from "../../../../context/ResumeContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "../resume.css";
import { v4 as uuidv4 } from "uuid";


export default function PersonalForm({ enableNext }) {
    const { resumeData, updatePersonalInfo, updateResumeSection } = useResume(); //  Use updatePersonalInfo, not updateLocalResumeData
    const [loading, setLoading] = useState(false);
    const [wasValidated, setWasValidated] = useState(false);
    const [personalInfo, setPersonalInfo] = useState([
  {
    id: uuidv4(),
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
  }
])


    useEffect(() => {
        if (
            Array.isArray(resumeData.personalInfo) &&
            resumeData.personalInfo.length > 0 &&
            JSON.stringify(resumeData.personalInfo) !== JSON.stringify(personalInfo)
        ) {
            setPersonalInfo(resumeData.personalInfo);
            enableNext(true);
        }
    }, [resumeData]);


    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updated = personalInfo.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        setPersonalInfo(updated);
        updatePersonalInfo(updated); // updates context
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setWasValidated(true); // <- trigger validation on submit
        setLoading(true);

        try {
            const { firstName, lastName, jobTitle, address, phone, email } = personalInfo[0] || {};

            if (!firstName || !lastName || !jobTitle || !address || !phone || !email) {
                toast.error("Please fill out all fields.");
                enableNext(false);
                setLoading(false);
                return;
            }

            updatePersonalInfo(personalInfo);

            await updateResumeSection({ personalInfo });
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
            className="forms-cards pt-2 pb-5 ps-3 pe-3 rounded-4 mt-4"
            style={{
                height: "fit-content",
                borderTop: "5px solid #0d6ff2f2",
                boxShadow: "rgba(0, 0, 0, 0.1) 1px 1px 12px 0px, rgba(0, 0, 0, 0.1) 4px 4px 12px 0px,  rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"

            }}
        >
            <h4 className="fw-bold pb-1 m-0 mt-2">Personal Detail</h4>
            <p className="pb-4">Get started with the basic information about yourself</p>

            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                {Array.isArray(personalInfo) &&
                    personalInfo.map((item, index) => (
                        <div key={item.id} className="row g-2 justify-content-between border border-1 border-dark rounded-3 p-1 p-sm-3 py-4">
                            <div className="col d-flex flex-column">
                                <label htmlFor="firstName" className="mb-1 fw-medium">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className={`p-1 form-control ${wasValidated && !item.firstName.trim() ? "is-invalid" : ""}`}
                                    value={item.firstName || ""}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                                {wasValidated && !item.firstName.trim() && (
                                    <div className="invalid-feedback d-block">First name is required.</div>
                                )}
                            </div>

                            <div className="col d-flex flex-column">
                                <label htmlFor="lastName" className="mb-1 fw-medium">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className={`p-1 form-control ${wasValidated && !item.lastName.trim() ? "is-invalid" : ""}`}
                                    value={item.lastName || ""}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                                {wasValidated && !item.lastName.trim() && (
                                    <div className="invalid-feedback d-block">Last name is required.</div>
                                )}
                            </div>

                            <div className=" d-flex flex-column">
                                <label htmlFor="jobTitle" className="mb-1 fw-medium">Job Title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    id="jobTitle"
                                    className={`p-1 form-control ${wasValidated && !item.jobTitle.trim() ? "is-invalid" : ""}`}
                                    value={item.jobTitle || ""}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                                {wasValidated && !item.jobTitle.trim() && (
                                    <div className="invalid-feedback d-block">Job title is required.</div>
                                )}
                            </div>

                            <div className=" d-flex flex-column">
                                <label htmlFor="address" className="mb-1 fw-medium">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    className={`p-1 form-control ${wasValidated && !item.address.trim() ? "is-invalid" : ""}`}
                                    value={item.address || ""}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                                {wasValidated && !item.address.trim() && (
                                    <div className="invalid-feedback d-block">Address is required.</div>
                                )}
                            </div>

                            <div className="col d-flex flex-column">
                                <label htmlFor="phone" className="mb-1 fw-medium">Phone</label>
                                <input
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    className={`edit-phone p-1 form-control ${wasValidated && !item.phone.trim() ? "is-invalid" : ""}`}
                                    value={item.phone || ""}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                                {wasValidated && !item.phone.trim() && (
                                    <div className="invalid-feedback d-block">Phone number is required.</div>
                                )}
                            </div>

                            <div className="col d-flex flex-column">
                                <label htmlFor="email" className="mb-1 fw-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`p-1 form-control ${wasValidated && !item.email.trim() ? "is-invalid" : ""}`}
                                    value={item.email || ""}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                                {wasValidated && !item.email.trim() && (
                                    <div className="invalid-feedback d-block">Email is required.</div>
                                )}
                            </div>


                        </div>))}
                <div className="d-flex justify-content-center mt-4">

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        sx={{ width: "7rem", fontWeight: 600, fontSize: "1rem" }}
                    >
                        {loading ? <CircularProgress size={20} /> : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
}