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

const defaultEducation = {
  id: uuidv4(),
  institution: "",
  field: "",
  degree: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
  description: "",
};

export default function EducationForm({ enableNext }) {
  const { resumeData, updateEducation, setResumeData, updateResumeSection } = useResume();
  const [loading, setLoading] = useState(false);
  const [wasValidated, setWasValidated] = useState(false);

  const [education, setEducation] = useState(
    resumeData?.education?.length ? resumeData.education : [{ ...defaultEducation }]
  );

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updated = education.map((item, i) =>
      i === index
        ? {
          ...item,
          [name]: type === "checkbox" ? checked : value,
          ...(name === "currentlyStudying" && checked ? { endDate: "" } : {}),
        }
        : item
    );
    setEducation(updated);
    setResumeData((prev) => ({ ...prev, education: updated }));
    updateEducation(updated);
  };

  const handleDescriptionChange = (value, index) => {
    const updated = [...education];
    updated[index].description = typeof value === "string" ? value : "";
    setEducation(updated);
    setResumeData((prev) => ({ ...prev, education: updated }));
    updateEducation(updated);
  };

  const addEducation = () => {
    const newEdu = [...education, { ...defaultEducation, id: uuidv4() }];
    setEducation(newEdu);
    setResumeData((prev) => ({ ...prev, education: newEdu }));
    updateEducation(newEdu);
  };

  const removeEducation = (index) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
    setResumeData((prev) => ({ ...prev, education: updated }));
    updateEducation(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWasValidated(true);
    setLoading(true);

    const isValid = education.every(
      (item) =>
        item.institution.trim() !== "" &&
        item.degree.trim() !== "" &&
        item.field.trim() !== "" &&
        item.startDate !== "" &&
        (item.currentlyStudying || item.endDate !== "")
    );

    if (!isValid) {
      toast.error("Please fill all required fields");
      enableNext(false);
      setLoading(false);
      return;
    }

    try {
      updateEducation(education);
      const response = await updateResumeSection({ education });
      toast.success("Education information saved");
      enableNext(true);
    } catch (error) {
      console.error("Error saving education:", error);
      toast.error("Failed to save education to server");
      enableNext(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    enableNext(false);
  }, [education]);

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
      <h4 className="fw-bold pb-1 m-0 mt-2">Education</h4>
      <p className="pb-4">Add your education details</p>

      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="container g-2 justify-content-between border border-1 border-dark rounded-3 p-3">
          {education.map((item, index) => (
            <div key={item.id} className="row g-2 justify-content-between mb-4">
              {/* Institution */}
              <div className="col-md-4 d-flex flex-column">
                <label className="fw-medium">University Name</label>
                <input
                  type="text"
                  name="institution"
                  value={item.institution}
                  onChange={(e) => handleChange(e, index)}
                  className={`form-control p-1 ${wasValidated && !item.institution.trim() ? "is-invalid" : ""}`}
                  required
                />
                {wasValidated && !item.institution.trim() && (
                  <div className="invalid-feedback">Institution name is required.</div>
                )}
              </div>

              {/* Degree */}
              <div className="col-md-4 d-flex flex-column">
                <label className="fw-medium">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={item.degree}
                  onChange={(e) => handleChange(e, index)}
                  className={`form-control p-1 ${wasValidated && !item.degree.trim() ? "is-invalid" : ""}`}
                  required
                />
                {wasValidated && !item.degree.trim() && (
                  <div className="invalid-feedback">Degree is required.</div>
                )}
              </div>

              {/* Field of Study */}
              <div className="col-md-4 d-flex flex-column">
                <label className="fw-medium">Field of Study</label>
                <input
                  type="text"
                  name="field"
                  value={item.field}
                  onChange={(e) => handleChange(e, index)}
                  className={`form-control p-1 ${wasValidated && !item.field.trim() ? "is-invalid" : ""}`}
                  required
                />
                {wasValidated && !item.field.trim() && (
                  <div className="invalid-feedback">Field is required.</div>
                )}
              </div>

                {/* Start Date */}
                <div className="col-md-4 d-flex flex-column">
                  <label className="fw-medium">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={item.startDate}
                    onChange={(e) => handleChange(e, index)}
                    className={`form-control p-1 ${wasValidated && !item.startDate ? "is-invalid" : ""}`}
                    required
                  />
                  {wasValidated && !item.startDate && (
                    <div className="invalid-feedback">Start date is required.</div>
                  )}
                </div>

                {/* End Date */}
                <div className="col-md-4 d-flex flex-column">
                  <label className="fw-medium">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={item.endDate}
                    onChange={(e) => handleChange(e, index)}
                    className={`form-control p-1 ${wasValidated && !item.currentlyStudying && !item.endDate ? "is-invalid" : ""
                      }`}
                    required={!item.currentlyStudying}
                    disabled={item.currentlyStudying}
                  />
                  {wasValidated && !item.currentlyStudying && !item.endDate && (
                    <div className="invalid-feedback">End date is required.</div>
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.currentlyStudying}
                        onChange={(e) => handleChange(e, index)}
                        name="currentlyStudying"
                      />
                    }
                    label="Currently studying here"
                  />
                </div>
              


              {/* Description */}
              <div className="col-12 d-flex flex-column mt-2">
                <label className="fw-medium">Description</label>
                <TextEditor
                  value={item.description}
                  onChange={(e) => handleDescriptionChange(e.target.value, index)}
                  style={{
                    minHeight: "150px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "10px",
                  }}
                  className={`${wasValidated && !item.description.trim() ? "is-invalid" : ""}`}
                />
                {wasValidated && !item.description.trim() && (
                  <div className="invalid-feedback d-block mt-1">Description is required.</div>
                )}
              </div>

              {/* Add/Remove buttons */}
              <div className="col-12 d-flex justify-content-between align-items-center mt-3">
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => removeEducation(index)}
                  disabled={education.length === 1}
                >
                  Remove Education
                </Button>

                {index === education.length - 1 && (
                  <Button variant="contained" onClick={addEducation}>
                    Add Education
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

