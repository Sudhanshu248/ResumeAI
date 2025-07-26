export default function Summary({ resumes }) {
  const summary = resumes?.summary || "";
  const themeColor = resumes?.themeColor || "#0d6efd";

  return (
    <div className="ps-3 pe-3 pt-3">
      {/* Section title with dynamic theme color */}
      <h5 className="text-start" style={{ color: themeColor }}>
        Summary
      </h5>
      <div style={{ border: `0.5px solid ${themeColor}` }} className="mb-2"></div>
      
      {/* Display Summary if available (supports rich text via dangerouslySetInnerHTML) */}
      <div
        className="text-start mt-2"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
    </div>
  );
}
