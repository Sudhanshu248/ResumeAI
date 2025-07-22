export default function Summary({ resumes }) {
  const summary = resumes?.personalInfo?.summary || "";
  const themeColor = resumes?.themeColor || "#0d6efd";

  return (
    <div className="ps-3 pe-3 pt-3">
      <h5 className="text-start" style={{ color: themeColor }}>
        Summary
      </h5>

      <div
        className="text-start mt-2"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
    </div>
  );
}
