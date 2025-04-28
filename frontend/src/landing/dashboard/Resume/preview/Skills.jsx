

export default function Skills({ resumeInfo }) {
    return (
        <div className="ps-3 pe-3 pt-3 pb-2">
            <h5 className="text-start" style={{ color: resumeInfo.themeColor }}>
                Skills
            </h5>
            <div style={{ border: `0.5px solid ${resumeInfo.themeColor}` }}></div>
            <div className="d-flex flex-row flex-wrap">
                {
                    resumeInfo.skills.map((skill , index) => (
                        <div key={index} className="me-2 mb-2 pe-2 ps-2">
                            <p className="text-start m-0">{skill.name}</p>
                            <div className="progress" style={{ backgroundColor: "#d5d1d1" , width:"14vw"}}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${skill.rating}%`, backgroundColor: resumeInfo.themeColor }}>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>

    )
}
