export default function Experience({ resumes }) {
const experienceList = Array.isArray(resumes?.experience) ? resumes.experience : [];

  if (experienceList.length === 0) return null;

  return (
    <div className="ps-3 pe-3 pt-3 m-0">
      <h5 className="text-start" style={{ color: resumes.themeColor }}>
        Experience
      </h5>
      <div style={{ border: `0.5px solid ${resumes.themeColor}` }} className="mb-2"></div>

      {experienceList.map((experience) => (
        <div key={experience.id} className="mb-3">
          <h6 className="text-start fw-bold mt-1">{experience.title}</h6>

          <div className="d-flex justify-content-between flex-wrap">
            <p className="text-start m-0">
              {experience.companyName}, {experience.city}, {experience.state}
            </p>
            <p className="text-end m-0">
              {experience.startDate} - {experience.currentlyWorking ? "Present" : experience.endDate}
            </p>
          </div>

          {experience.workSummery && (
            <div className="text-start mt-1">
              <div dangerouslySetInnerHTML={{ __html: experience.workSummery }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}