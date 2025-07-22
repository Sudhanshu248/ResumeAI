import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { useResume } from "../../../../context/ResumeContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextEditor from "react-simple-wysiwyg";
import { v4 as uuidv4 } from 'uuid';

const formFields = {
    id: uuidv4(),
    universityName: '',
    degree: '',
    fieldofstudy: '',
    startDate: '',
    endDate: '',
    description: '',
}

export default function EducationForm({ enableNext }) {
    const { resumeData, updateEducation } = useResume();
    const [education, setEducation] = useState(resumeData?.education || [{ ...formFields }]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        const updatedEducation = education.map((item, i) =>
            i === index ? {
                ...item,
                [name]: type === 'checkbox' ? checked : value,
                // If currently studying is checked, set endDate to empty
                ...(name === 'currentlyStudying' && checked ? { endDate: '' } : {})
            } : item
        );

        setEducation(updatedEducation);
        updateEducation(updatedEducation);
    };

    const handleAddEducation = () => {
        const newEducation = [...education, { ...formFields, id: uuidv4() }];
        setEducation(newEducation);
        updateEducation(newEducation);
    };

    const handleRemoveEducation = (index) => {
        const updatedEducation = education.filter((_, i) => i !== index);
        setEducation(updatedEducation);
        updateEducation(updatedEducation);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate that all required fields are filled
            const isValid = education.every(item =>
                item.universityName.trim() !== "" &&
                item.degree.trim() !== "" &&
                item.fieldofstudy.trim() !== "" &&
                item.startDate !== "" &&
                (item.currentlyStudying || item.endDate !== "")
            );

            if (!isValid) {
                toast.error("Please fill in all required fields");
                enableNext(false);
                return;
            }

            // Update context with validated data
            updateEducation(education);
            toast.success("Education information saved successfully");
            enableNext(true);

        } catch (error) {
            toast.error("Error saving education information");
            enableNext(false);

        } finally {
            setLoading(false);
        }
    };

    // Reset enableNext when form changes
    useEffect(() => {
        enableNext(false);
    }, [education]);

    return (
        <div className="pt-2 pb-5 ps-3 pe-3 rounded-4 mt-4 " style={{ height: "fit-content", borderTop: "5px solid #0d6ff2f2", boxShadow: "rgba(136, 165, 191, 0.48) 4px 4px 10px 0px, rgba(255, 255, 255, 0.8) -3px -3px 10px 0px"}}>
            <h4 className="fw-bold pb-1 m-0 mt-2">Education</h4>
            <p className="pb-4">Add your education details</p>

           
                <div className="container g-2 justify-content-between border border-1 border-dark rounded-3 p-3">
                    {education.map((items, index) => (
                        <div key={index} className="row g-2 justify-content-between mb-4">

                            <div className="col d-flex flex-column">
                                <label htmlFor="universityName" className="fw-medium">University Name</label>
                                <input type="text" name="universityName" value={items.universityName} onChange={(e) => handleChange(e, index)} className="p-1" required />
                            </div>

                            <div className="col d-flex flex-column">
                                <label htmlFor="degree" className="fw-medium">Degree</label>
                                <input type="text" name="degree" value={items.degree} onChange={(e) => handleChange(e, index)} className="p-1" required />
                            </div>

                            <div className="col d-flex flex-column">
                                <label htmlFor="fieldofstudy" className="fw-medium">Field of Study</label>
                                <input type="text" name="fieldofstudy" value={items.fieldofstudy} onChange={(e) => handleChange(e, index)} className="p-1" required />
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
                                        required={!items.currentlyStudying}
                                        disabled={items.currentlyStudying}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={items.currentlyStudying}
                                                onChange={(e) => handleChange(e, index)}
                                                name="currentlyStudying"
                                            />
                                        }
                                        label="Currently studying here"
                                    />

                                </div>
                            </div>

                            <div className="col-12 d-flex flex-column mt-2">
                                <label htmlFor="description" className="fw-medium">Description</label>
                                <TextEditor
                                    name="description"
                                    value={items.description}
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
                                    onClick={() => handleRemoveEducation(index)}
                                    disabled={education.length === 1}
                                    type="button"
                                >
                                    Remove Education
                                </Button>

                                {index === education.length - 1 && (
                                    <Button
                                        variant="contained"
                                        type="button"
                                        onClick={handleAddEducation}
                                    >
                                        Add Education
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
