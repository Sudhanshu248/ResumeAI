import '../resume.css'

export default function Personal({ resumes }) {
  const personal = Array.isArray(resumes?.personalInfo) ? resumes.personalInfo : [];
  const themeColor = resumes?.themeColor || "#0d6efd";

  return (
    <>
      {/* Section title with dynamic theme color */}
      {personal.map((personalList, index) => (
        <div key={personalList.id || index} className="pe-3 ps-3 pt-3 m-0 " style={{ textAlign: "center" }}>

          {/* Display Your Name */}
          <h2 className="text-center fs-4 fw-bold">
            {personalList.firstName} {personalList.lastName}
          </h2>

          {/* Display Jobtitle */}
          {personalList.jobTitle && (
            <h3 className="text-center fs-5 text-secondary mb-1">{personalList.jobTitle}</h3>
          )}

          {/* Display address */}
          {personalList.address && (
            <p className="text-center fw-medium">{personalList.address}</p>
          )}

          {/* Display Phone no. and email */}
          <div className="d-flex justify-content-between align-items-center gap-2  mb-2 preview-personal" style={{ width: "100%" }}>
            {personalList.phone && <p className="m-0">{personalList.phone}</p>}
            {personalList.email && <p className="m-0">{personalList.email}</p>}
          </div>

          <div
            className="m-0"
            style={{
              border: "0.2px solid rgba(0, 0, 0, 0.2)",
            }}
          ></div>
        </div>
      ))}
    </>
  );
}
