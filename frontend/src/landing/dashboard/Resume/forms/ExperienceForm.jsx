import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextEditor from "react-simple-wysiwyg";
import { v4 as uuidv4 } from "uuid";
import { useResume } from "../../../../context/ResumeContext.jsx";

const createNewExperience = () => ({
  id: uuidv4(),
  jobTitle: "",
  companyName: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  currentlyWorking: false,
});

export default function ExperienceForm({ enableNext }) {
    const { resumeData, updateExperience, updateResumeSection } = useResume();
    const [experience, setExperience] = useState([createNewExperience()]);
    const [loading, setLoading] = useState(false);
    const [wasValidated, setWasValidated] = useState(false);


    useEffect(() => {
        if (Array.isArray(resumeData?.experience) && resumeData.experience.length) {
            setExperience(resumeData.experience);
        }
    }, []);

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;

        const updated = experience.map((item, i) =>
            i === index
                ? {
                    ...item,
                    [name]: type === "checkbox" ? checked : value,
                    ...(name === "currentlyWorking" && checked ? { endDate: "" } : {}),
                }
                : item
        );

        setExperience(updated);
        updateExperience(updated);
    };

    const handleDescriptionChange = (value, index) => {
        const updated = [...experience];
        updated[index].description = value;
        setExperience(updated);
        updateExperience(updated);
    };

    const addExperience = () => {
        const newList = [...experience, createNewExperience()];
        setExperience(newList);
        updateExperience(newList);
    };

    const removeExperience = (index) => {
        const updated = experience.filter((_, i) => i !== index);
        setExperience(updated);
        updateExperience(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Save button clicked!");
        setLoading(true);

        try {
            const isValid = experience.every(
                (item) =>
                    item.jobTitle.trim() &&
                    item.companyName.trim() &&
                    item.location.trim() &&
                    item.startDate &&
                    (item.currentlyWorking || item.endDate)
            );

            if (!isValid) {
                toast.error("Please fill all required fields");
                enableNext(false);
                setLoading(false);
                return;
            }

            updateExperience(experience); //  correct flat array
            console.log("Experience data to be saved:", experience);

            const response = await updateResumeSection({ experience });
            console.log(" Server response after update:", response);

            toast.success("Experience information saved");
            enableNext(true);
        } catch (error) {
            toast.error("Failed to save experience to server");
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
                    "rgba(136, 165, 191, 0.48) 4px 4px 10px 0px, rgba(255, 255, 255, 0.8) -3px -3px 10px 0px",
            }}
        >
            <h4 className="fw-bold pb-1 m-0 mt-2">Experience</h4>
            <p className="pb-4">Add your work experience</p>

            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="container g-2 justify-content-between border border-1 border-dark rounded-3 p-3">

                    {Array.isArray(experience) &&
                        experience.map((item, index) => (
                            <div key={item.id} className="row g-2 justify-content-between mb-4">
                                {/* Job Title */}
                                <div className="col-md-4 d-flex flex-column">
                                    <label className="fw-medium">Job Title</label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={item.jobTitle || ""}
                                        onChange={(e) => handleChange(e, index)}
                                        className={`p-1 form-control ${wasValidated && !item.jobTitle.trim() ? "is-invalid" : ""}`}
                                        required
                                    />
                                    {wasValidated && !item.jobTitle.trim() && (
                                        <div className="invalid-feedback d-block">Job title is required.</div>
                                    )}
                                </div>

                                {/* Company Name */}
                                <div className="col-md-4 d-flex flex-column">
                                    <label className="fw-medium">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={item.companyName || ""}
                                        onChange={(e) => handleChange(e, index)}
                                        className={`p-1 form-control ${wasValidated && !item.companyName.trim() ? "is-invalid" : ""}`}
                                        required
                                    />
                                    {wasValidated && !item.companyName.trim() && (
                                        <div className="invalid-feedback d-block">Company name is required.</div>
                                    )}
                                </div>

                                {/* Location */}
                                <div className="col-md-4 d-flex flex-column">
                                    <label className="fw-medium">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={item.location || ""}
                                        onChange={(e) => handleChange(e, index)}
                                        className={`p-1 form-control ${wasValidated && !item.location.trim() ? "is-invalid" : ""}`}
                                        required
                                    />
                                    {wasValidated && !item.location.trim() && (
                                        <div className="invalid-feedback d-block">Location is required.</div>
                                    )}
                                </div>

                                {/* Start Date */}
                                <div className="col-md-4 d-flex flex-column">
                                    <label className="fw-medium">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={item.startDate || ""}
                                        onChange={(e) => handleChange(e, index)}
                                        className={`p-1 form-control ${wasValidated && !item.startDate ? "is-invalid" : ""}`}
                                        required
                                    />
                                    {wasValidated && !item.startDate && (
                                        <div className="invalid-feedback d-block">Start date is required.</div>
                                    )}
                                </div>

                                {/* End Date */}
                                <div className="col-md-4 d-flex flex-column">
                                    <label className="fw-medium">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={item.endDate || ""}
                                        onChange={(e) => handleChange(e, index)}
                                        className={`p-1 form-control ${wasValidated && !item.currentlyWorking && !item.endDate
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                        required={!item.currentlyWorking}
                                        disabled={item.currentlyWorking}
                                    />
                                    {wasValidated && !item.currentlyWorking && !item.endDate && (
                                        <div className="invalid-feedback d-block">End date is required.</div>
                                    )}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={item.currentlyWorking}
                                                onChange={(e) => handleChange(e, index)}
                                                name="currentlyWorking"
                                            />
                                        }
                                        label="Currently working here"
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-12 d-flex flex-column mt-2">
                                    <label className="fw-medium">Description</label>
                                    <TextEditor
                                        value={typeof item.description === "string" ? item.description : ""}
                                        onChange={(e) => handleDescriptionChange(e.target.value, index)}
                                        style={{
                                            minHeight: "150px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            padding: "10px",
                                        }}
                                    />
                                </div>

                                {/* Add/Remove buttons */}
                                <div className="col-12 d-flex justify-content-between align-items-center mt-3">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => removeExperience(index)}
                                        disabled={experience.length === 1}
                                    >
                                        Remove Experience
                                    </Button>

                                    {index === experience.length - 1 && (
                                        <Button variant="contained" onClick={addExperience}>
                                            Add Experience
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}



                </div>

                <div className="d-flex justify-content-center align-items-center mt-4">
                    <button
                        className="btn btn-primary text-white fw-semibold fs-5 px-4 py-2"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={20} /> : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}