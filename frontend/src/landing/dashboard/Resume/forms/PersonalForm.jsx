import { useState, useEffect } from "react";
import { useResume } from "../../../../context/ResumeContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "../resume.css";

export default function PersonalForm({ enableNext }) {
    const { resumeData, updatePersonalInfo, updateResumeSection } = useResume(); // ✅ Use updatePersonalInfo, not updateLocalResumeData
    const [loading, setLoading] = useState(false);

    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        lastName: "",
        jobTitle: "",
        address: "",
        phone: "",
        email: "",
    });

    // ✅ Sync form state when resumeData is loaded
    useEffect(() => {
        if (resumeData?.personalInfo) {
            setPersonalInfo(resumeData.personalInfo);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...personalInfo, [name]: value };
        setPersonalInfo(updated);
        updatePersonalInfo(updated); // ✅ Use context-safe updater
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const { firstName, lastName, jobTitle, address, phone, email } = personalInfo;

        if (!firstName || !lastName || !jobTitle || !address || !phone || !email) {
            toast.error("Please fill out all fields.");
            enableNext(false);
            setLoading(false);
            return;
        }

        // 1. Update local context
        updatePersonalInfo(personalInfo);

        // 2. Check if resume ID is loaded before backend call
        console.log("🪪 Resume ID in context:", resumeData?._id);

        if (!resumeData?._id) {
            toast.error("Resume ID not loaded yet. Try again in a moment.");
            setLoading(false);
            return;
        }

        // 3. Send to backend
        const response = await updateResumeSection({ personalInfo });
        console.log("✅ Server response after update:", response);

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

            <form onSubmit={handleSubmit}>
                <div className="row g-3 justify-content-between">
                    <div className="col d-flex flex-column">
                        <label htmlFor="firstName" className="mb-1 fw-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="p-1"
                            value={personalInfo.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col d-flex flex-column">
                        <label htmlFor="lastName" className="mb-1 fw-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="p-1"
                            value={personalInfo.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="d-flex flex-column">
                        <label htmlFor="jobTitle" className="mb-1 fw-medium">Job Title</label>
                        <input
                            type="text"
                            name="jobTitle"
                            id="jobTitle"
                            className="p-1"
                            value={personalInfo.jobTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="d-flex flex-column">
                        <label htmlFor="address" className="mb-1 fw-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            className="p-1"
                            value={personalInfo.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col d-flex flex-column">
                        <label htmlFor="phone" className="mb-1 fw-medium">Phone</label>
                        <input
                            type="number"
                            name="phone"
                            id="phone"
                            className="edit-phone p-1"
                            value={personalInfo.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col d-flex flex-column">
                        <label htmlFor="email" className="mb-1 fw-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="p-1 border border-1 border-dark"
                            value={personalInfo.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-center align-items-center text-end mt-3">
                        <button
                            className="btn btn-primary text-white fw-semibold fs-5 mx-auto px-4 py-2"
                            style={{ width: "7rem" }}
                             type="submit"
                        // disabled={loading}
                        >
                            {loading ? <CircularProgress size={20} /> : "Save"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}