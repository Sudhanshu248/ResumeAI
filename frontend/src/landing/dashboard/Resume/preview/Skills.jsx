export default function Skills({ resumeData }) {
    return (
        <div className="ps-3 pe-3 pt-4 pb-3">
            <h5 className="text-start" style={{ color: resumeData.themeColor }}>
                Skills
            </h5>
            <div style={{ border: `0.5px solid ${resumeData.themeColor}` }}></div>
            <div className="d-flex flex-row flex-wrap mt-3">
                {
                    resumeData.skills.map((skill, index) => (
                        <div key={index} className="me-2  mb-2 pe-2 ps-2">
                          <ul>
                          <li className="text-start m-0" style={{ fontSize: "1.2rem" }}>{skill.name}</li>
                          </ul>
                            <div className="progress" style={{ backgroundColor: "", width: "14vw" }}>
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${skill.rating * 20}%`, backgroundColor: resumeData.themeColor }}>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>

    )
}
