import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import TextEditor from "react-simple-wysiwyg";
import { useResume } from "../../../../context/ResumeContext.jsx";
import { AIChatSession } from "../../../../server/AIModel.js";

export default function SummaryForm({ enableNext }) {
  const { resumeData, setResumeData, updateSummary, updateResumeSection } = useResume();
  const [summary, setSummary] = useState(resumeData?.personalInfo?.summary || "");
  const [loading, setLoading] = useState(false);

  const prompt = `Job Title: ${resumeData?.personalInfo?.jobTitle}, based on my job title, give me a resume summary within 4–5 lines.`;

  useEffect(() => {
    enableNext(false);
  }, [enableNext]);

  const handleAI = async () => {
    setLoading(true);
    try {
      const response = await AIChatSession.sendMessage(prompt);
      const responseText = await response.response.text();
      const parsed = JSON.parse(responseText);
      const generatedSummary = parsed.summary.join("\n\n");

      setSummary(generatedSummary);

      // Update local resume data
      setResumeData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          summary: generatedSummary,
        },
      }));

      toast.success("AI summary generated!");
    } catch (error) {
      console.error("AI Summary Error:", error);
      toast.error("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

    if (!summary.trim()) {
      toast.error("Please enter a summary");
      enableNext(false);
      setLoading(false);
      return;
    }

      // Update local state
      const updatedData = {
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          summary: summary,
        },
      };
      setResumeData(updatedData);

      // Save to backend via context
      updateSummary( summary );
    console.log("Summary data to be saved:", summary);

          const response = await updateResumeSection({ summary });
    console.log("✅ Server response after update:", response);

      toast.success("Summary saved successfully!");
      enableNext(true);
    } catch (err) {
      toast.error("Error saving summary!");
      console.error(err);
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
      <h4 className="fw-bold pb-1 m-0 mt-2">Summary</h4>
      <p className="pb-4">Add a summary of your career and skills</p>

      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center mb-3 px-2">
          <label htmlFor="summary" className="fw-medium m-0">
            Summary
          </label>
          <Button
            variant="outlined"
            color="info"
            onClick={handleAI}
            disabled={loading}
            type="button"
            sx={{
              borderColor: "rgba(193, 87, 246, 0.95)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "rgba(168, 36, 220, 0.95)",
              fontWeight: 600,
            }}
          >
            {loading ? <CircularProgress size={20} /> : "Generate From AI"}
          </Button>
        </div>

        <TextEditor
          value={String(summary)}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Write your professional summary here..."
          className="form-control p-2"
        />

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
