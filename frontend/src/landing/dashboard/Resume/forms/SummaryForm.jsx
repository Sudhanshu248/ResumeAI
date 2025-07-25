import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import TextEditor from "react-simple-wysiwyg";
import { useResume } from "../../../../context/ResumeContext.jsx";
import { AIChatSession } from "../../../../server/AIModel.js";
import { BASE_URL } from "../../../../axiosConfig.js";

export default function SummaryForm({ enableNext }) {
  const { resumeData, setResumeData, updateSummary, updateResumeSection } = useResume();
  const [summary, setSummary] = useState(""); // Initial empty
  const [loading, setLoading] = useState(false);
  const [wasValidated, setWasValidated] = useState(false);

  const prompt = `Job Title: cloud engineer, based on my job title, Write a professional resume summary in 3-4 lines, plain text only — no formatting, markdown, or bullet points.`;
  console.log(`Job title = ${resumeData?.personalInfo?.jobTitle}`);
  
  // ✅ Sync state on mount (like PRG)
useEffect(() => {
  const contextSummary =
    resumeData?.summary ||
    resumeData?.personalInfo?.summary ||
    "";

    const summaryStr = String(contextSummary || "");
    setSummary(summaryStr);

  if(resumeData?.summary){
    enableNext(true);
  }

  // ❌ DO NOT enableNext here — only update UI
}, [resumeData]);








const handleAI = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      setLoading(false);
      return;
    }

    const response = await fetch(`${BASE_URL}/generate-summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        section: "summary",
        customPrompt: prompt,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "AI generation failed");

    const rawSummary = data.responseText;
    const firstOptionMatch = rawSummary.match(/Option 1.*?(?=Option 2|$)/s);
    const firstOption = firstOptionMatch ? firstOptionMatch[0].trim() : rawSummary.trim();

    // ✅ Update form input
    setSummary(firstOption);

    // ✅ Update preview only — don't enableNext
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        summary: firstOption,
      },
      summary: firstOption, // if you show summary in root-level preview
    }));

    toast.success("AI summary generated! Please review and save.");
  } catch (err) {
    console.error("❌ AI Error:", err);
    toast.error("Failed to generate summary.");
  } finally {
    setLoading(false);
  }
};














  const handleSubmit = async (e) => {
    e.preventDefault();
    setWasValidated(true);
    setLoading(true);

    try {
      if (!String(summary).trim()) {

        enableNext(false);
        setLoading(false);
        return;
      }

      const updatedData = {
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          summary,
        },
      };

      setResumeData(updatedData);
      updateSummary(summary);
      await updateResumeSection({ summary });

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
      className="forms-cards pt-2 pb-5 ps-3 pe-3 rounded-4 mt-4"
      style={{
        height: "fit-content",
        borderTop: "5px solid #0d6ff2f2",
                     boxShadow: "rgba(0, 0, 0, 0.1) 1px 1px 12px 0px, rgba(0, 0, 0, 0.1) 4px 4px 12px 0px,  rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"

      }}
    >
      <h4 className="fw-bold pb-1 m-0 mt-2">Summary</h4>
      <p className="pb-4">Add a summary of your career and skills</p>

      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center mb-3 px-2">
          <div></div>
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
              fontWeight: 400,
            }}
          >
            {loading ? <CircularProgress size={18} /> : "Generate From AI"}
          </Button>
        </div>

        <div className="mb-3">

<TextEditor
 key={summary}
  value={summary} // not String(summary) || ""
  onChange={(e) => {
    const value = e.target.value;
    setSummary(value);
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        summary: value,
      },
      summary: value,
    }));
  }}
  placeholder="Write your professional summary here..."
  className={`form-control p-2 ${wasValidated && !summary.trim() ? "is-invalid" : ""}`}
  style={{ borderRadius: "4px", minHeight: "150px", border: "1px solid #ced4da" }}
/>

          {wasValidated && !summary.trim() && (
            <div className="invalid-feedback d-block mt-1">Summary is required.</div>
          )}
        </div>

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
