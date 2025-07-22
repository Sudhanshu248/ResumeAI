export default function Skills({ resumes }) {
  const skills = resumes?.skills || [];
  const themeColor = resumes?.themeColor || "#0d6efd";

  return (
    <div className="ps-3 pe-3 pt-4 pb-3">
      <h5 className="text-start" style={{ color: themeColor }}>
        Skills
      </h5>

      <div style={{ border: `0.5px solid ${themeColor}` }}></div>

      <div className="d-flex flex-wrap mt-3">
        {skills.map((skill, index) => (
          <div key={index} className="me-3 mb-3" style={{ minWidth: "200px" }}>
            <p className="mb-1 fw-medium">{skill.name}</p>

            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{
                  width: `${skill.rating * 20}%`,
                  backgroundColor: themeColor,
                }}
                role="progressbar"
                aria-valuenow={skill.rating * 20}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
