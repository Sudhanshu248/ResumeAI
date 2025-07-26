export default function Experience({ resumes }) {
  const experienceList = Array.isArray(resumes?.experience) ? resumes.experience : [];
  const themeColor = resumes?.themeColor || "#0d6efd";

  return (
    <div className="ps-3 pe-3 pt-3 m-0">
      {/* Section title with dynamic theme color */}
      <h5 className="text-start" style={{ color: themeColor }}>
        Experience
      </h5>
      <div style={{ border: `0.5px solid ${themeColor}` }} className="mb-2"></div>

      {/* Loop through all experience entries */}
      {experienceList.map((experience) => (
        <div key={experience.id} className="mb-3">

          {/* Display Jobtitle */}
          <h6 className="text-start fw-bold mt-1">{experience.jobTitle}</h6>

          {/* Display company name and location  with date range */}
          <div className="d-flex justify-content-between flex-wrap">
            <p className="text-start m-0">
              {experience.companyName}, {experience.location}
            </p>
            <p className="text-end m-0">
              {experience.startDate?.slice(0, 10)} - {experience.currentlyWorking ? "Present" : experience.endDate?.slice(0, 10)}
            </p>

          </div>

          {/* Display description if available (supports rich text via dangerouslySetInnerHTML) */}
          {experience.description && (
            <div className="text-start mt-1">
              <div dangerouslySetInnerHTML={{ __html: experience.description }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}