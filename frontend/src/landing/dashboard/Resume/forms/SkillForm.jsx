// ✅ SkillForm.jsx (with validation UI)
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { useResume } from "../../../../context/ResumeContext.jsx";

const initialSkill = () => ({
  id: uuidv4(),
  name: "",
  rating: 0,
});

export default function SkillForm({ enableNext }) {
  const { resumeData, setResumeData, updateSkills, updateResumeSection } = useResume();
  const [loading, setLoading] = useState(false);
  const [wasValidated, setWasValidated] = useState(false);

  const [skills, setSkills] = useState(
    resumeData?.skills?.length ? resumeData.skills : [initialSkill()]
  );

  useEffect(() => {
    enableNext(false);
  }, []);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const updated = skills.map((skill) =>
      skill.id === id ? { ...skill, [name]: value } : skill
    );
    setSkills(updated);
    setResumeData((prev) => ({ ...prev, skills: updated }));
  };

  const handleRatingChange = (rating, id) => {
    const updated = skills.map((skill) =>
      skill.id === id ? { ...skill, rating } : skill
    );
    setSkills(updated);
    setResumeData((prev) => ({ ...prev, skills: updated }));
  };

  const handleAddSkill = () => {
    const updated = [...skills, initialSkill()];
    setSkills(updated);
    setResumeData((prev) => ({ ...prev, skills: updated }));
  };

  const handleRemoveSkill = (id) => {
    if (skills.length === 1) return;
    const updated = skills.filter((skill) => skill.id !== id);
    setSkills(updated);
    setResumeData((prev) => ({ ...prev, skills: updated }));
  };

  const renderStars = (rating, id) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <StarIcon
            key={i}
            onClick={() => handleRatingChange(i, id)}
            sx={{ color: "#0d6efd", fontSize: "2rem", cursor: "pointer" }}
          />
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <StarHalfIcon
            key={i}
            onClick={() => handleRatingChange(i - 0.5, id)}
            sx={{ color: "#0d6efd", fontSize: "2rem", cursor: "pointer" }}
          />
        );
      } else {
        stars.push(
          <StarBorderIcon
            key={i}
            onClick={() => handleRatingChange(i, id)}
            sx={{ color: "#ccc", fontSize: "2rem", cursor: "pointer" }}
          />
        );
      }
    }
    return stars;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWasValidated(true);
    setLoading(true);

    try {
      const isValid = skills.every((skill) => skill.name.trim() !== "");

      if (!isValid) {
        toast.error("Please fill in all skill names");
        enableNext(false);
        setLoading(false);
        return;
      }

      updateSkills(skills);
      await updateResumeSection({ skills });

      toast.success("Skills saved successfully!");
      enableNext(true);
    } catch (err) {
      console.error(" Error updating skills:", err);
      toast.error("Failed to save skills");
      enableNext(false);
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
      <h4 className="fw-bold pb-1 m-0 mt-2">Skills</h4>
      <p className="pb-4">Add your technical or soft skills</p>

      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        {skills.map((skill, index) => (
          <div key={skill.id} className="mb-3 p-3 border rounded-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-semibold">Skill {index + 1}</h6>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleRemoveSkill(skill.id)}
                disabled={skills.length === 1}
              >
                <DeleteIcon />
              </Button>
            </div>

            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <label className="mb-1 fw-medium">Skill Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className={`form-control ${wasValidated && !skill.name.trim() ? "is-invalid" : ""}`}
                  value={skill.name || ""}
                  onChange={(e) => handleChange(e, skill.id)}
                />
                {wasValidated && !skill.name.trim() && (
                  <div className="invalid-feedback d-block">
                    Skill name is required.
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="mb-1 fw-medium">Rating</label>
                <div className="d-flex align-items-center">
                  {renderStars(skill.rating, skill.id)}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-between mt-4">
          <Button variant="outlined" onClick={handleAddSkill}>
            Add Skill
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
