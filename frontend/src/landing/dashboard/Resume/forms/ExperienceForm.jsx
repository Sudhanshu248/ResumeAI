import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { useResume } from "../../../../context/ResumeContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextEditor from "react-simple-wysiwyg";
import { v4 as uuidv4 } from 'uuid';

const formFields = {
    id: uuidv4(),
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    workSummery: '',
}

export default function ExperienceForm({ enableNext }) {
    const { resumeData, updateExperience } = useResume();
    const [experience, setExperience] = useState(resumeData?.experience || [{ ...formFields }]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        const updatedExperience = experience.map((item, i) =>
            i === index ? {
                ...item,
                [name]: type === 'checkbox' ? checked : value,
                // If currently working is checked, set endDate to empty
                ...(name === 'currentlyWorking' && checked ? { endDate: '' } : {})
            } : item
        );

        setExperience(updatedExperience);
        updateExperience(updatedExperience);
    };

    const handleAddExperience = () => {
        const newExperience = [...experience, { ...formFields, id: uuidv4() }];
        setExperience(newExperience);
        updateExperience(newExperience);
    };

    const handleRemoveExperience = (index) => {
        const updatedExperience = experience.filter((_, i) => i !== index);
        setExperience(updatedExperience);
        updateExperience(updatedExperience);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate that all required fields are filled
            const isValid = experience.every(item =>
                item.title.trim() !== "" &&
                item.companyName.trim() !== "" &&
                item.city.trim() !== "" &&
                item.state.trim() !== "" &&
                item.startDate !== "" &&
                (item.currentlyWorking || item.endDate !== "")
            );

            if (!isValid) {
                enableNext(false);
                return;
            }

            // Update context with validated data
            updateExperience(experience);

            enableNext(true);
        } catch (error) {
            console.error('Error saving experience:', error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-2 pb-5 ps-3 pe-3 rounded-3 mt-4 ms-3" style={{ height: "fit-content", borderTop: "5px solid #0d6ff2f2", boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
            <h4 className="fw-bold pb-1 m-0 mt-2">Personal Experience</h4>
            <p className="pb-4">Add your work experience</p>

          
                <div className="container g-2 justify-content-between border border-1 border-dark rounded-3 p-3">
                    {experience.map((items, index) => (
                        <div key={index} className="row g-2 justify-content-between mb-4">
                            <div className="col d-flex flex-column">
                                <label htmlFor="title" className="fw-medium">Position Title</label>
                                <input type="text" name="title" value={items.title} onChange={(e) => handleChange(e, index)} className="p-1" required />
                            </div>

                            <div className="col d-flex flex-column">
                                <label htmlFor="companyName" className="fw-medium">Company Name</label>
                                <input type="text" name="companyName" value={items.companyName} onChange={(e) => handleChange(e, index)} className="p-1" required />
                            </div>

                            <div className="col d-flex flex-column">
                                <label htmlFor="city" className="fw-medium">City</label>
                                <input type="text" name="city" value={items.city} onChange={(e) => handleChange(e, index)} className="p-1" required />
                            </div>
                            <div className="col d-flex flex-column">
                                <label htmlFor="state" className="fw-medium">State</label>
                                <input type="text" name="state" value={items.state} onChange={(e) => handleChange(e, index)} className="p-1" required />
                            </div>
                            <div className="col d-flex flex-column">
                                <label htmlFor="startDate" className="fw-medium">Start Date</label>
                                <input type="date" name="startDate" value={items.startDate} onChange={(e) => handleChange(e, index)} className="p-1" required />
                            </div>
                            <div className="col d-flex flex-column">
                                <label htmlFor="endDate" className="fw-medium">End Date</label>
                                <div className="d-flex flex-column">
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={items.endDate}
                                        onChange={(e) => handleChange(e, index)}
                                        className="p-1"
                                        required={!items.currentlyWorking}
                                        disabled={items.currentlyWorking}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={items.currentlyWorking}
                                                onChange={(e) => handleChange(e, index)}
                                                name="currentlyWorking"
                                            />
                                        }
                                        label="Currently working here"
                                    />
                                </div>
                            </div>

                            <div className="col-12 d-flex flex-column mt-2">
                                <label htmlFor="workSummery" className="fw-medium">Work Summary</label>
                                <TextEditor
                                    name="workSummery"
                                    value={items.workSummery}
                                    onChange={(e) => handleChange(e, index)}
                                    className="p-1"
                                    style={{ minHeight: "150px", border: "1px solid #ccc", borderRadius: "4px" }}
                                    required
                                />
                            </div>

                            <div className="col-12 d-flex justify-content-between align-items-center mt-3">
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleRemoveExperience(index)}
                                    disabled={experience.length === 1}
                                    type="button"
                                >
                                    Remove Experience
                                </Button>
                                {index === experience.length - 1 && (
                                    <Button
                                        variant="contained"
                                        type="button"
                                        onClick={handleAddExperience}
                                    >
                                        Add Experience
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center align-items-center text-end mt-4">
                    <button
                        className="btn btn-primary text-white fw-semibold fs-5 mx-auto pe-1 ps-1 py-1"
                        style={{ width: "7rem" }}
                        onClick={handleSubmit}
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? <CircularProgress size={20} /> : "Save"}
                    </button>
                </div>
      
        </div>
    )
}
