import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { useResume } from "../../../../context/ResumeContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export default function SkillForm({enableNext}) {
    const [loading, setLoading] = useState(false);
    const {resumeData, updateSkills} = useResume();
    const [skillList, setSkillList] = useState(
        resumeData?.skills || [{
            id: uuidv4(),
            name: "",
            rating: 0
        }]
    );

    // Reset enableNext when form changes
    useEffect(() => {
        enableNext(false);
    }, [skillList]);

    const CaseUpper = (str) => {
        return str.toUpperCase();
    };

    const handleChange = (e, skillId) => {
        const { name, value } = e.target;
        const updatedSkills = skillList.map(skill => {
            if (skill.id === skillId) {
                return {
                    ...skill,
                    [name]: value
                };
            }
            return skill;
        });
        setSkillList(updatedSkills);
        updateSkills(updatedSkills);
    };

    const handleRatingChange = (value, skillId) => {
        const updatedSkills = skillList.map(skill => {
            if (skill.id === skillId) {
                return {
                    ...skill,
                    rating: value
                };
            }
            return skill;
        });
        setSkillList(updatedSkills);
        updateSkills(updatedSkills);
    };

    const renderStars = (rating, skillId) => {
        const stars = [];
        const totalStars = 5;
        
        for (let i = 1; i <= totalStars; i++) {
            if (i <= rating) {
                stars.push(
                    <StarIcon
                        key={i}
                        sx={{ 
                            color: '#0d6efd',
                            cursor: 'pointer',
                            fontSize: '2rem'
                        }}
                        onClick={() => handleRatingChange(i, skillId)}
                    />
                );

            } else if (i - 0.5 <= rating) {
                stars.push(
                    <StarHalfIcon
                        key={i}
                        sx={{ 
                            color: '#0d6efd',
                            cursor: 'pointer',
                            fontSize: '2rem'
                        }}
                        onClick={() => handleRatingChange(i - 0.5, skillId)}
                    />
                );

            } else {
                stars.push(
                    <StarBorderIcon
                        key={i}
                        sx={{ 
                            color: '#e4e5e9',
                            cursor: 'pointer',
                            fontSize: '2rem'
                        }}
                        onClick={() => handleRatingChange(i, skillId)}
                    />
                );
            }
        }
        return stars;
    };

    const handleAddSkill = () => {
        const newSkill = {
            id: uuidv4(),
            name: "",
            rating: 0
        };
        const updatedSkills = [...skillList, newSkill];
        setSkillList(updatedSkills);
        updateSkills(updatedSkills);
    };

    const handleRemoveSkill = (skillId) => {
        if (skillList.length > 1) {
            const updatedSkills = skillList.filter(skill => skill.id !== skillId);
            setSkillList(updatedSkills);
            updateSkills(updatedSkills);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Validate that all skills have names and ratings
            const isValid = skillList.every(skill => skill.name.trim() !== "" && skill.rating >= 0);
            if (!isValid) {
                toast.error("Please fill in all skill fields");
                enableNext(false);
                return;
            }

            // Update context with validated data
            updateSkills(skillList);
            toast.success("Skills saved successfully!");
            enableNext(true);

        } catch (error) {
            toast.error("Error saving skills");
            enableNext(false);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-2 pb-5 ps-3 pe-3 rounded-4 mt-4 " style={{ height: "fit-content", borderTop: "5px solid #0d6ff2f2", boxShadow: "rgba(136, 165, 191, 0.48) 4px 4px 10px 0px, rgba(255, 255, 255, 0.8) -3px -3px 10px 0px"}}>
            <h4 className="fw-bold pb-1 m-0 mt-2">Skills</h4>
            <p className="pb-4">Add your skills</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    {skillList.map((skill) => (
                        <div key={skill.id} className="mb-3 p-3 border rounded">

                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="m-0">Skill {skillList.indexOf(skill) + 1}</h6>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemoveSkill(skill.id)}
                                    disabled={skillList.length === 1}
                                    type="button"
                                >
                                    <DeleteIcon />
                                </Button>
                            </div>

                            <div className="row g-3">

                                <div className="col-md-6">
                                    <div className="d-flex flex-column">
                                        <label htmlFor={`name-${skill.id}`} className="mb-1 fw-medium">Skill Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="form-control"
                                            id={`name-${skill.id}`}
                                            value={skill.name}
                                            onChange={(e) => handleChange(e, skill.id)}
                                        />
                                        <p className="text-start m-0" style={{ fontSize: "1.2rem" }}>{CaseUpper(skill.name)}</p>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="d-flex flex-column">
                                        <label htmlFor={`rating-${skill.id}`} className="mb-1 fw-medium">Rating</label>
                                        <div className="d-flex align-items-center">
                                            {renderStars(skill.rating, skill.id)}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-between align-items-center">

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSkill}
                        type="button"
                    >
                        Add Skill
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Save"}
                    </Button>
                    
                </div>
            </form>
        </div>
    );
}
