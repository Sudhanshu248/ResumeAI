export default function Education({ resumes }) {
  const educationList = resumes?.education || [];
  const themeColor = resumes?.themeColor || "#0d6efd";


  return (
    <div className="ps-3 pe-3 pt-3">

      {/* Section title with dynamic theme color */}
      <h5 className="text-start" style={{ color: themeColor }}>
        Education
      </h5>

      {/* Thin divider line using theme color */}
      <div style={{ border: `0.5px solid ${themeColor}` }} className="mb-2"></div>

      {/* Loop through all education entries */}
      {educationList.map((education) => (
        <div key={education.id} className="mb-3">
          {/* Display institution name */}
          <h6 className="text-start fw-bold">{education.institution}</h6>

          {/* Display degree and field with date range */}
          <div className="d-flex justify-content-between flex-wrap">
            <p className="text-start m-0">
              {education.field} — {education.degree}
            </p>
            <p className="text-end m-0">
              {education.startDate?.slice(0, 10)} - {education.currentlyStudying ? "Present" : education.endDate?.slice(0, 10)}
            </p>
          </div>


          {/* Display description if available (supports rich text via dangerouslySetInnerHTML) */}
          {education.description && (
            <div className="text-start mt-1">
              <div dangerouslySetInnerHTML={{ __html: education.description }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
