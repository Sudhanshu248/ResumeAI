export default function Education({ resumes }) {
  const educationList = resumes?.education || [];
  const themeColor = resumes?.themeColor || "#0d6efd";

  if (educationList.length === 0) return null;

  return (
    <div className="ps-3 pe-3 pt-3">
      <h5 className="text-start" style={{ color: themeColor }}>
        Education
      </h5>

      {/* <div style={{ border: `0.5px solid ${themeColor}` }} className="mb-2"></div> */}

      {educationList.map((education) => (
        <div key={education.id} className="mb-3">
          <h6 className="text-start fw-bold">{education.universityName}</h6>

          <div className="d-flex justify-content-between flex-wrap">
            <p className="text-start m-0">
              {education.fieldofstudy} — {education.degree}
            </p>
            <p className="text-end m-0">
              {education.startDate} - {education.endDate}
            </p>
          </div>

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
