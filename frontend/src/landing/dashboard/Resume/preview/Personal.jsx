export default function Personal({ resumes }) {
  const personal = resumes?.personalInfo || {};
  const themeColor = resumes?.themeColor || "#0d6efd";

  return (
    <div className="pe-3 ps-3 pt-3 m-0">
      <h2 className="text-center fs-4 fw-bold">
        {personal.firstName || ""} {personal.lastName || ""}
      </h2>

      {personal.jobTitle && (
        <h3 className="text-center fs-5 text-secondary mb-1">{personal.jobTitle}</h3>
      )}

      {personal.address && (
        <p className="text-center fw-medium">{personal.address}</p>
      )}

      <div className="d-flex justify-content-center gap-4 flex-wrap mb-2">
        {personal.phone && <p className="m-0">{personal.phone}</p>}
        {personal.email && <p className="m-0">{personal.email}</p>}
      </div>

      <div
        className="m-0"
        style={{
          border: `1px solid ${themeColor}`,
        }}
      ></div>
    </div>
  );
}
