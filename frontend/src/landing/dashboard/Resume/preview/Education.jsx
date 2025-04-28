export default function Education({ resumeInfo }) {
    return (
        <div className="ps-3 pe-3 pt-3">
            <h5 className="text-start" style={{ color: resumeInfo.themeColor }}>Education</h5>
            <div style={{ border: `0.5px solid ${resumeInfo.themeColor}` }}></div>
            {
                resumeInfo.education.map((education) => (
                    <div key={education.id} className="m-0">
                        <h6 className="text-start fw-bold mt-2">{education.universityName}</h6>
                        <div className="d-flex justify-content-between m-0" >
                            <p className="text-start " >{education.major} in {education.degree}</p>
                            <p className="text-start ">{education.startDate} - {education.endDate}</p>
                        </div>
                        <p className="text-start m-0">{education.description}</p>
                    </div>
                ))
            }
        </div>
    )
}
